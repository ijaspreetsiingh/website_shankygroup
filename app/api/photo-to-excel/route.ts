import { NextResponse } from 'next/server';

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Free vision models — image + text support (OpenRouter free tier)
// meta-llama/llama-3.2-11b-vision-instruct:free returns 404, removed
const FREE_VISION_MODELS = [
  'openrouter/polaris-alpha:free',
  'nvidia/nemotron-nano-12b-v2-vl:free',
  'google/gemini-2.0-flash-001:free',
];

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
    const apiKey = process.env.OPENROUTER_API_KEY?.trim();
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OPENROUTER_API_KEY missing in .env.local' },
        { status: 503 }
      );
    }

    let body: { imageBase64?: string; mimeType?: string };
    try {
      body = await request.json();
    } catch (parseErr) {
      const msg = parseErr instanceof Error ? parseErr.message : String(parseErr);
      console.error('Photo-to-Excel: body parse failed', msg);
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

    // OpenRouter has size limits; very large base64 can fail
    if (imageBase64.length > 4_000_000) {
      return NextResponse.json(
        { error: 'Image bahut badi hai. Chhoti image ya kam resolution use karo.' },
        { status: 400 }
      );
    }

    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    const dataUrl = `data:${mimeType};base64,${base64Data}`;

    const messages = [
      {
        role: 'user' as const,
        content: [
          { type: 'text' as const, text: TABLE_EXTRACT_PROMPT },
          {
            type: 'image_url' as const,
            image_url: { url: dataUrl },
          },
        ],
      },
    ];

    let rawText = '';
    let lastError = '';
    let lastStatus = 0;

    for (const model of FREE_VISION_MODELS) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60_000);
        const res = await fetch(OPENROUTER_URL, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://shankygroup.com',
          },
          body: JSON.stringify({
            model,
            messages,
            temperature: 0.1,
            max_tokens: 8192,
          }),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        const text = await res.text();
        if (res.ok) {
          try {
            const data = JSON.parse(text);
            rawText = data.choices?.[0]?.message?.content?.trim() ?? '';
            if (rawText) break;
            lastError = 'Model ne koi table data return nahi kiya.';
          } catch {
            lastError = text.slice(0, 500);
          }
          lastStatus = res.status;
          continue;
        }
        lastStatus = res.status;
        lastError = text.slice(0, 500);
        if (res.status === 404 || res.status === 402 || res.status === 403) continue;
        break;
      } catch (fetchErr) {
        const msg = fetchErr instanceof Error ? fetchErr.message : String(fetchErr);
        lastError = msg;
        lastStatus = 502;
        if (msg.includes('abort') || msg.includes('timeout')) {
          lastError = 'Request timeout. Chhoti image try karo ya thodi der baad try karo.';
        }
        continue;
      }
    }

    if (!rawText) {
      return NextResponse.json(
        {
          error: lastError || 'OpenRouter se response nahi aaya. Try a different image or try again.',
        },
        { status: lastStatus >= 500 ? 502 : 400 }
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
    console.error('Photo-to-Excel API error:', err);
    return NextResponse.json(
      { error: message || 'Server error. Try again.' },
      { status: 500 }
    );
  }
}
