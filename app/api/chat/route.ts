import { NextResponse } from 'next/server';
import { CHATBOT_KNOWLEDGE, CHATBOT_DEFAULT_ANSWER } from '@/app/lib/chatbot-knowledge';

function buildSystemPrompt(hasPriorUserMessages: boolean): string {
  const knowledgeText = CHATBOT_KNOWLEDGE.map(
    (e) => `Keywords/Topic: ${e.keywords.join(', ')}\nInformation: ${e.answer}`
  ).join('\n\n---\n\n');
  const conversationRule = hasPriorUserMessages
    ? 'Do NOT say Namaste/Hello/Welcome again. Answer only the user\'s current question in context.'
    : 'This is the user\'s FIRST message. Give a warm welcome: e.g. "Namaste! 👋 Welcome to Shanky Group. Kaise help kar sakta hoon?" Be friendly and inviting, then offer help (companies, careers, contact).';
  return `You are Shanky Group (shankygroup.com) chatbot. Your ONLY source of information is the KNOWLEDGE BASE below. Do not invent or add facts. Reply in the user's language (Hindi/English). If unsure, suggest Contact page or +011-47586938. Be warm and helpful.

CONVERSATION: ${conversationRule}

RULES:
- Answer ONLY from the knowledge base below. Give COMPLETE, helpful answers — not one-line replies. When the user asks what the company does, kaam kya karti hai, or about Shanky Group, give a full summary (companies, sectors, key facts) from the knowledge base.
- When listing items (e.g. companies, points, steps), put each item on its own line: use a newline after each numbered or bullet point so the reply is easy to read, not one long paragraph.
- Accept casual/friendly Hindi (e.g. bhai, yaar, bro). Do NOT ask users to "use respectful language" for normal conversation.
- Do not say "I don't have information" for topics that are in the knowledge — use the matching entry. For job/career/naukri queries use the careers section; give openings, careers@shankygroup.com.

--- KNOWLEDGE BASE (use only this data) ---
${knowledgeText}
--- END KNOWLEDGE BASE ---

Fallback if nothing matches: "${CHATBOT_DEFAULT_ANSWER}"`;
}

/** Groq/OpenRouter — full knowledge, no truncation. */
function buildGroqSystemPrompt(hasPriorUserMessages: boolean): string {
  const conversationLine = hasPriorUserMessages
    ? 'Do NOT greet again. Answer only the current question in context.'
    : 'This is the user\'s FIRST message. Give warm welcome: Namaste! Welcome to Shanky Group. Kaise help kar sakta hoon?';
  const knowledgeText = CHATBOT_KNOWLEDGE.map(
    (e) => `Keywords/Topic: ${e.keywords.join(', ')}\nInformation: ${e.answer}`
  ).join('\n\n---\n\n');
  return `You are Shanky Group (shankygroup.com) chatbot. Your ONLY source of info is the KNOWLEDGE below. Answer ONLY from it. Do not invent facts. Reply in Hindi/English. If unsure: Contact or +011-47586938.
Give COMPLETE answers (full summary), not one-line replies. When user asks what the company does / kaam kya karti hai, give companies, sectors, key facts from knowledge.
When listing items (companies, points, steps), put each item on its own line (newline after each number/bullet) so it reads as a list, not one paragraph.
Accept casual Hindi (bhai, yaar). Do NOT ask for "respectful language" for normal chat.
CONVERSATION: ${conversationLine}
Job/career/naukri → use careers section; give openings, careers@shankygroup.com.

--- KNOWLEDGE (use only this) ---
${knowledgeText}
--- END KNOWLEDGE ---

Fallback if nothing matches: "${CHATBOT_DEFAULT_ANSWER}"`;
}

type ChatMessage = { role: 'user' | 'assistant'; content: string };

const V1BETA_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';
const GROQ_CHAT_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.1-8b-instant';
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OPENROUTER_MODEL = 'openrouter/free';

/** Returns true if error is quota/rate limit so we can fallback to next chatbot */
function isGeminiLimitError(status: number, errMsg: string): boolean {
  if (status === 429 || status === 503) return true;
  const lower = (errMsg || '').toLowerCase();
  return (
    lower.includes('quota') ||
    lower.includes('resource_exhausted') ||
    lower.includes('rate limit') ||
    lower.includes('rate_limit') ||
    lower.includes('too many requests')
  );
}

/** Returns true if error message indicates rate limit (any provider) — for auto-switch */
function isRateLimitError(errMsg: string): boolean {
  const lower = (errMsg || '').toLowerCase();
  return (
    lower.includes('rate limit') ||
    lower.includes('rate_limit') ||
    lower.includes('quota') ||
    lower.includes('too many requests')
  );
}

async function getAvailableModels(apiKey: string): Promise<string[]> {
  const res = await fetch(
    `${V1BETA_BASE}?key=${encodeURIComponent(apiKey)}`
  );
  const data = await res.json();
  if (!res.ok) return [];
  const models = (data.models || [])
    .filter((m: { supportedGenerationMethods?: string[] }) =>
      m.supportedGenerationMethods?.includes('generateContent')
    )
    .map((m: { name: string }) => (m.name || '').replace(/^models\//, ''));
  return models.filter(Boolean);
}

/** Call Groq API. Full knowledge + full history, no truncation. */
async function tryGroq(
  messages: ChatMessage[],
  userMessage: string,
  hasPriorUserMessages: boolean
): Promise<{ reply: string } | { error: string }> {
  const groqKey = process.env.GROQ_API_KEY?.trim();
  if (!groqKey) {
    return { error: 'Chatbot 3 API key missing in .env.local — add GROQ_API_KEY and restart server' };
  }

  const systemPrompt = buildGroqSystemPrompt(hasPriorUserMessages);
  const openAiMessages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [
    { role: 'system', content: systemPrompt },
    ...messages,
    { role: 'user', content: userMessage },
  ];

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25_000);
    const res = await fetch(GROQ_CHAT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${groqKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: openAiMessages,
        temperature: 0.4,
        max_tokens: 4096,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const errText = await res.text();
    if (!res.ok) {
      let msg = errText.slice(0, 300);
      try {
        const j = JSON.parse(errText);
        msg = j.error?.message || j.error?.message || msg;
      } catch {
        // use errText
      }
      if (res.status === 401) return { error: 'Chatbot 3: Invalid API key — check key at console.groq.com' };
      if (res.status === 429) return { error: 'Chatbot 3: Rate limit — try again in a minute' };
      return { error: `Chatbot 3 error (${res.status}): ${msg}` };
    }
    const data = JSON.parse(errText);
    const reply = data.choices?.[0]?.message?.content?.trim();
    if (reply) return { reply };
    return { error: 'Chatbot 3: No reply in response' };
  } catch (e) {
    const err = e instanceof Error ? e : new Error(String(e));
    const cause = (err as Error & { cause?: Error }).cause?.message;
    const code = (err as NodeJS.ErrnoException).code;
    if (err.name === 'AbortError' || cause?.includes('abort')) {
      return { error: 'Chatbot 3: Request timeout — try again in a moment' };
    }
    if (code === 'ECONNREFUSED' || code === 'ENOTFOUND' || err.message === 'fetch failed') {
      return { error: 'Chatbot 3: Network unreachable — check internet or try again later' };
    }
    return { error: `Chatbot 3: ${cause || err.message}` };
  }
}

/** OpenRouter (Chatbot 2) — same short prompt + trimmed history, free model. */
async function tryOpenRouter(
  messages: ChatMessage[],
  userMessage: string,
  hasPriorUserMessages: boolean
): Promise<{ reply: string } | { error: string }> {
  const key = process.env.OPENROUTER_API_KEY?.trim();
  if (!key) {
    return { error: 'Chatbot 2 API key missing — add OPENROUTER_API_KEY in .env.local' };
  }

  const systemPrompt = buildGroqSystemPrompt(hasPriorUserMessages);
  const openAiMessages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [
    { role: 'system', content: systemPrompt },
    ...messages,
    { role: 'user', content: userMessage },
  ];

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25_000);
    const res = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
        'HTTP-Referer': 'https://shankygroup.com',
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages: openAiMessages,
        temperature: 0.4,
        max_tokens: 4096,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const errText = await res.text();
    if (!res.ok) {
      let msg = errText.slice(0, 300);
      try {
        const j = JSON.parse(errText);
        msg = j.error?.message || j.error?.message || msg;
      } catch {
        // keep
      }
      if (res.status === 401) return { error: 'Chatbot 2: Invalid API key — check openrouter.ai/keys' };
      if (res.status === 429) return { error: 'Chatbot 2: Rate limit — try again in a minute' };
      return { error: `Chatbot 2 error (${res.status}): ${msg}` };
    }
    const data = JSON.parse(errText);
    const reply = data.choices?.[0]?.message?.content?.trim();
    if (reply) return { reply };
    return { error: 'Chatbot 2: No reply in response' };
  } catch (e) {
    const err = e instanceof Error ? e : new Error(String(e));
    const cause = (err as Error & { cause?: Error }).cause?.message;
    const code = (err as NodeJS.ErrnoException).code;
    if (err.name === 'AbortError' || cause?.includes('abort')) {
      return { error: 'Chatbot 2: Request timeout — try again in a moment' };
    }
    if (code === 'ECONNREFUSED' || code === 'ENOTFOUND' || err.message === 'fetch failed') {
      return { error: 'Chatbot 2: Network unreachable — check internet or try again later' };
    }
    return { error: `Chatbot 2: ${cause || err.message}` };
  }
}

/** Chatbot 1 (Gemini) — same shape as tryOpenRouter/tryGroq for unified chain */
async function tryGemini(
  systemPrompt: string,
  messages: ChatMessage[],
  userMessage: string
): Promise<{ reply: string } | { error: string }> {
  const apiKey = (process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY)?.trim();
  if (!apiKey) return { error: 'Chatbot 1 API key missing' };

  const availableModels = await getAvailableModels(apiKey);
  if (availableModels.length === 0) return { error: 'Chatbot 1: No models available' };

  const conversationHistory = messages.map((m) => `${m.role}: ${m.content}`).join('\n');
  const fullPrompt = `${systemPrompt}\n\nConversation:\n${conversationHistory || '(none)'}\nuser: ${userMessage}\nassistant:`;
  const payload = {
    contents: [{ parts: [{ text: fullPrompt }] }],
    generationConfig: { temperature: 0.4, maxOutputTokens: 4096 },
  };

  let lastError = '';
  let lastStatus = 0;

  for (const model of availableModels) {
    const url = `${V1BETA_BASE}/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      if (reply) return { reply };
    }

    const errText = await res.text();
    let errMsg = errText;
    try {
      const errJson = JSON.parse(errText);
      errMsg = errJson.error?.message || errJson.error?.message || errText;
    } catch {
      // keep errText
    }
    lastError = errMsg;
    lastStatus = res.status;
    if (res.status !== 404 && res.status !== 400) break;
  }

  const err = lastError || `Chatbot 1 error (${lastStatus})`;
  return { error: err };
}

export async function POST(request: Request) {
  try {
    const apiKey = (process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY)?.trim();
    const openRouterKey = process.env.OPENROUTER_API_KEY?.trim();
    const groqKey = process.env.GROQ_API_KEY?.trim();

    const useChatbot1 = process.env.USE_CHATBOT_1 !== 'false' && process.env.USE_CHATBOT_1 !== '0';
    const useChatbot2 = process.env.USE_CHATBOT_2 !== 'false' && process.env.USE_CHATBOT_2 !== '0';
    const useChatbot3 = process.env.USE_CHATBOT_3 !== 'false' && process.env.USE_CHATBOT_3 !== '0';

    const hasAny = (useChatbot1 && !!apiKey) || (useChatbot2 && !!openRouterKey) || (useChatbot3 && !!groqKey);
    if (!hasAny) {
      return NextResponse.json(
        { error: 'At least one API: set USE_CHATBOT_1/2/3=true and add its key in .env.local' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const messages: ChatMessage[] = Array.isArray(body.messages) ? body.messages : [];
    const userMessage = typeof body.message === 'string' ? body.message.trim() : '';
    if (!userMessage) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const hasPriorUserMessages = messages.some((m) => m.role === 'user');
    const systemPrompt = buildSystemPrompt(hasPriorUserMessages);

    console.log('[Chat] Active — Chatbot 1:', useChatbot1 && apiKey ? 'ON' : 'OFF', '| Chatbot 2:', useChatbot2 && openRouterKey ? 'ON' : 'OFF', '| Chatbot 3:', useChatbot3 && groqKey ? 'ON' : 'OFF');

    // Helper: try a provider, return result
    const tryProvider = async (
      name: 'gemini' | 'openrouter' | 'groq'
    ): Promise<{ reply: string } | { error: string }> => {
      if (name === 'gemini') return tryGemini(systemPrompt, messages, userMessage);
      if (name === 'openrouter') return tryOpenRouter(messages, userMessage, hasPriorUserMessages);
      return tryGroq(messages, userMessage, hasPriorUserMessages);
    };

    // Primary chain: sirf enabled + key wale (user preference)
    const primary: { name: 'gemini' | 'openrouter' | 'groq'; label: string }[] = [];
    if (useChatbot1 && apiKey) primary.push({ name: 'gemini', label: 'Gemini' });
    if (useChatbot2 && openRouterKey) primary.push({ name: 'openrouter', label: 'OpenRouter (Chatbot 2)' });
    if (useChatbot3 && groqKey) primary.push({ name: 'groq', label: 'Groq (Chatbot 3)' });

    // Fallback chain: rate limit pe try karne ke liye — jo enabled nahi hai but KEY maujood hai
    const fallbackWhenRateLimit: { name: 'gemini' | 'openrouter' | 'groq'; label: string }[] = [];
    if (apiKey && !primary.some((p) => p.name === 'gemini')) fallbackWhenRateLimit.push({ name: 'gemini', label: 'Gemini' });
    if (openRouterKey && !primary.some((p) => p.name === 'openrouter')) fallbackWhenRateLimit.push({ name: 'openrouter', label: 'OpenRouter (Chatbot 2)' });
    if (groqKey && !primary.some((p) => p.name === 'groq')) fallbackWhenRateLimit.push({ name: 'groq', label: 'Groq (Chatbot 3)' });

    let lastError = '';
    let gotRateLimit = false;

    // Pehle primary chain try karo
    for (const p of primary) {
      const result = await tryProvider(p.name);
      if ('reply' in result) {
        console.log('[Chat] Reply from:', p.label);
        return NextResponse.json({
          reply: result.reply,
          provider: p.name === 'gemini' ? 'gemini' : p.name === 'openrouter' ? 'openrouter' : 'groq',
        });
      }
      lastError = result.error;
      if (isRateLimitError(result.error)) {
        gotRateLimit = true;
        console.log('[Chat] Rate limit on', p.name, '— trying other chatbots');
      }
    }

    // Primary fail (rate limit / timeout / koi bhi) pe: doosre providers try karo (keys present hon to)
    if (fallbackWhenRateLimit.length > 0) {
      for (const p of fallbackWhenRateLimit) {
        const result = await tryProvider(p.name);
        if ('reply' in result) {
          console.log('[Chat] Reply from:', p.label, '(auto-switch after rate limit)');
          return NextResponse.json({
            reply: result.reply,
            provider: p.name === 'gemini' ? 'gemini' : p.name === 'openrouter' ? 'openrouter' : 'groq',
          });
        }
        lastError = result.error;
      }
    }

    // Sab try ho gaye, koi reply nahi — default answer with fallback reason
    return NextResponse.json({
      reply: CHATBOT_DEFAULT_ANSWER,
      provider: 'fallback',
      fallbackReason: lastError || 'Enable at least one: USE_CHATBOT_1/2/3=true and set its API key in .env.local',
    });
  } catch (err) {
    console.error('Chat API error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Server error. Try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const apiKey = (process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY)?.trim();
  if (!apiKey) {
    return NextResponse.json({ error: 'No API key' }, { status: 503 });
  }
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(apiKey)}`
    );
    const data = await res.json();
    if (!res.ok) return NextResponse.json(data, { status: res.status });
    const models = (data.models || [])
      .filter((m: { supportedGenerationMethods?: string[] }) =>
        m.supportedGenerationMethods?.includes('generateContent')
      )
      .map((m: { name: string }) => m.name?.replace('models/', '') || m.name);
    return NextResponse.json({ models });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
