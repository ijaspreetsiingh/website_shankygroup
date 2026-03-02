import { NextResponse } from 'next/server';

const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';
const GEMINI_VISION_MODEL = 'gemini-1.5-flash';

const TABLE_EXTRACT_PROMPT = `You are a table extraction assistant. Look at the image carefully.

The image may contain:
- A table (with headers and rows)
- A form or list that looks like rows/columns
- Any structured data in rows and columns

Extract ALL table-like data from the image. Return ONLY a valid JSON array of arrays (no markdown, no code block, no explanation).
- First row should be headers (column names). If there are no clear headers, use "Column1", "Column2", etc.
- Each subsequent row is an array of cell values (strings or numbers).
- Preserve order: same as in the image, left to right, top to bottom.
- Empty cells can be "".
- If there are multiple tables in the image, combine them with a clear structure or put the first/main table.

Example format:
[["Name","Age","City"],["Rahul","25","Delhi"],["Priya","30","Mumbai"]]

Return ONLY the JSON array, nothing else.`;

export async function POST(request: Request) {
  try {
    const apiKey = (process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY)?.trim();
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY (ya GOOGLE_AI_API_KEY) .env.local mein add karo' },
        { status: 503 }
      );
    }

    let body: { imageBase64?: string; mimeType?: string };
    try {
      body = await request.json();
    } catch (parseErr) {
      const msg = parseErr instanceof Error ? parseErr.message : String(parseErr);
      console.error('Image+Gemini: body parse failed', msg);
      return NextResponse.json(
        { error: 'Invalid request body (JSON expected). Image size bhi zyada na ho.' },
        { status: 400 }
      );
    }

    const imageBase64 = typeof body.imageBase64 === 'string' ? body.imageBase64.trim() : '';
    const mimeType = typeof body.mimeType === 'string' ? body.mimeType : 'image/jpeg';

    if (!imageBase64) {
      return NextResponse.json(
        { error: 'imageBase64 is required' },
        { status: 400 }
      );
    }

    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    if (base64Data.length > 4_000_000) {
      return NextResponse.json(
        { error: 'Image bahut badi hai. Chhoti image ya kam resolution use karo.' },
        { status: 400 }
      );
    }

    const url = `${GEMINI_BASE}/${GEMINI_VISION_MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60_000);

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { inlineData: { mimeType, data: base64Data } },
              { text: TABLE_EXTRACT_PROMPT },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 8192,
        },
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const text = await res.text();
    if (!res.ok) {
      let errMsg = text.slice(0, 400);
      try {
        const j = JSON.parse(text);
        errMsg = j.error?.message || errMsg;
      } catch {
        // keep errMsg
      }
      return NextResponse.json(
        { error: errMsg || `Gemini error ${res.status}` },
        { status: res.status >= 500 ? 502 : 400 }
      );
    }

    let data: { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> };
    try {
      data = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { error: 'Gemini se invalid response aaya.' },
        { status: 502 }
      );
    }

    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? '';
    if (!rawText) {
      return NextResponse.json(
        { error: 'Gemini ne koi table data return nahi kiya. Clear table wali image try karo.' },
        { status: 422 }
      );
    }

    let cleaned = rawText.trim();
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```\w*\n?/, '').replace(/\n?```$/, '');
    }

    let rows: string[][];
    try {
      const parsed = JSON.parse(cleaned);
      if (!Array.isArray(parsed)) throw new Error('Not an array');
      rows = parsed.map((row: unknown) =>
        Array.isArray(row) ? row.map((c: unknown) => String(c ?? '')) : [String(row)]
      );
    } catch {
      return NextResponse.json(
        {
          error:
            'Table data parse nahi ho paya. Clear table wali image use karo ya phir try again.',
        },
        { status: 422 }
      );
    }

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Koi rows extract nahi hui. Image mein clear table honi chahiye.' },
        { status: 422 }
      );
    }

    return NextResponse.json({ rows });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('Image+Gemini API error:', err);
    if (message.includes('abort') || message.includes('timeout')) {
      return NextResponse.json(
        { error: 'Request timeout. Chhoti image try karo ya thodi der baad try karo.' },
        { status: 504 }
      );
    }
    return NextResponse.json(
      { error: message || 'Server error. Try again.' },
      { status: 500 }
    );
  }
}
