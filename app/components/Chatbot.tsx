'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getReplyFromKnowledge } from '../lib/chatbot-knowledge';

const ACCENT = '#e63a27';
const ACCENT_DARK = '#c42e1e';

const QUICK_REPLIES = [
  { label: '📞 Contact us', text: 'I want to get in touch with your team.' },
  { label: '🏢 Our companies', text: 'Tell me about your companies and businesses.' },
  { label: '💼 Careers', text: 'I am interested in career opportunities.' },
];

/* ── Avatars ──────────────────────────────────────────────────── */
function BotAvatar({ sm }: { sm?: boolean }) {
  const s = sm ? 28 : 38;
  return (
    <div style={{
      width: s, height: s, borderRadius: '50%',
      flexShrink: 0, position: 'relative', overflow: 'hidden',
      boxShadow: '0 0 0 2px rgba(230,58,39,0.4)',
      aspectRatio: '1/1',
    }}>
      <Image
        src="/images/logo_icon.png"
        alt="Shanky Group"
        fill
        className="object-contain"
        sizes={`${s}px`}
        style={{ padding: '4px' }}
        unoptimized
      />
    </div>
  );
}

function UserAvatar({ sm }: { sm?: boolean }) {
  const s = sm ? 28 : 38;
  return (
    <div style={{
      width: s, height: s, borderRadius: '50%',
      flexShrink: 0, overflow: 'hidden',
      background: 'rgba(255,255,255,0.08)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      aspectRatio: '1/1',
    }}>
      <svg viewBox="0 0 40 46" width={s} height={s} xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="16" r="10" fill="rgba(255,255,255,0.25)" />
        <ellipse cx="20" cy="45" rx="18" ry="13" fill="rgba(255,255,255,0.25)" />
      </svg>
    </div>
  );
}

/* ── Provider badge ─────────────────────────────────────────── */
function ProviderBadge({ provider, fallbackReason, fromApi, apiError }: {
  provider?: string; fallbackReason?: string; fromApi?: boolean; apiError?: string;
}) {
  const map: Record<string, string> = {
    gemini: '🟢 AI Engine 1',
    openrouter: '🟡 AI Engine 2',
    groq: '🔵 AI Engine 3',
    fallback: '⚪ Local',
  };
  return (
    <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', marginTop: 3, display: 'block', paddingLeft: 2 }}>
      {provider ? map[provider] || provider : fromApi === false ? 'Offline' : ''}
      {fallbackReason && <span style={{ color: ACCENT }}> — {fallbackReason}</span>}
      {apiError && <span style={{ color: ACCENT, display: 'block' }}>{apiError}</span>}
    </span>
  );
}

/* ── Typing dots ────────────────────────────────────────────── */
function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: 4, padding: '10px 14px' }}>
      {[0, 160, 320].map((d) => (
        <span key={d} style={{
          width: 6, height: 6, borderRadius: '50%',
          background: 'rgba(255,255,255,0.25)',
          display: 'inline-block',
          animation: 'sgBounce 1.2s ease-in-out infinite',
          animationDelay: `${d}ms`,
        }} />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════ */
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{
    role: 'user' | 'bot'; text: string;
    fromApi?: boolean; apiError?: string;
    provider?: 'gemini' | 'openrouter' | 'groq' | 'fallback';
    fallbackReason?: string;
  }[]>([
    { role: 'bot', text: 'Hello! 👋 Welcome to Shanky Group.\nHow can I help you today?', fromApi: true, provider: 'fallback' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState<{
    fullText: string; displayed: number;
    fromApi?: boolean; apiError?: string;
    provider?: 'gemini' | 'openrouter' | 'groq' | 'fallback';
    fallbackReason?: string;
  } | null>(null);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [hiVisible, setHiVisible] = useState(false);
  const [hiBubbleKey, setHiBubbleKey] = useState(0);
  const [panelReady, setPanelReady] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* streaming */
  useEffect(() => {
    if (!streamingMessage) return;
    const { fullText, displayed } = streamingMessage;
    if (displayed >= fullText.length) {
      setMessages((p) => [...p, {
        role: 'bot', text: fullText,
        fromApi: streamingMessage.fromApi,
        apiError: streamingMessage.apiError,
        provider: streamingMessage.provider,
        fallbackReason: streamingMessage.fallbackReason,
      }]);
      setStreamingMessage(null);
      return;
    }
    const id = setInterval(() => {
      setStreamingMessage((p) => p ? { ...p, displayed: Math.min(p.displayed + 2, p.fullText.length) } : null);
    }, 16);
    return () => clearInterval(id);
  }, [streamingMessage]);

  /* hi bubble cycle */
  useEffect(() => {
    if (isOpen) return;
    let s: ReturnType<typeof setTimeout>;
    let h: ReturnType<typeof setTimeout>;
    const doShow = () => { setHiVisible(true); setHiBubbleKey((k) => k + 1); h = setTimeout(doHide, 3000); };
    const doHide = () => { setHiVisible(false); s = setTimeout(doShow, 5000); };
    s = setTimeout(doShow, 4000);
    return () => { clearTimeout(s); clearTimeout(h); };
  }, [isOpen]);

  /* panel animation trigger */
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => { setPanelReady(true); inputRef.current?.focus(); }, 10);
      return () => clearTimeout(t);
    } else {
      setPanelReady(false);
    }
  }, [isOpen]);

  /* scroll */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, streamingMessage]);

  /* send */
  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setShowQuickReplies(false);
    setMessages((p) => [...p, { role: 'user', text: trimmed }]);
    setInputValue('');
    setIsTyping(true);
    const history = messages.map((m) => ({ role: m.role === 'bot' ? 'assistant' : 'user', content: m.text }));
    try {
      const res = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history, message: trimmed }),
      });
      const data = await res.json().catch(() => ({}));
      const fromApi = res.ok && typeof data.reply === 'string';
      const kr = getReplyFromKnowledge(trimmed);
      const answerText = fromApi ? data.reply : (typeof kr === 'string' ? kr : kr.answer);
      const apiError = !res.ok ? (data.error || data.details || 'API error') : undefined;
      setIsTyping(false);
      setStreamingMessage({ fullText: answerText, displayed: 0, fromApi, apiError, provider: fromApi ? data.provider : undefined, fallbackReason: data.fallbackReason });
    } catch {
      const kr = getReplyFromKnowledge(trimmed);
      setIsTyping(false);
      setStreamingMessage({ fullText: typeof kr === 'string' ? kr : kr.answer, displayed: 0, fromApi: false, apiError: 'Network error' });
    }
  };

  const handleSend = () => sendMessage(inputValue);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };
  const closeChat = () => { (document.activeElement as HTMLElement)?.blur(); setIsOpen(false); };

  /* ── Render ─────────────────────────────────────────────── */
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600&display=swap');

        .sg-root * { box-sizing: border-box; font-family: 'DM Sans', sans-serif; }

        @keyframes sgPop {
          0%   { opacity:0; transform:translate(-50%,12px) scale(.6); }
          65%  { transform:translate(-50%,-4px) scale(1.05); }
          100% { opacity:1; transform:translate(-50%,0) scale(1); }
        }
        @keyframes sgBounce {
          0%,80%,100% { transform:translateY(0); }
          40%          { transform:translateY(-5px); }
        }
        @keyframes sgFadeUp {
          from { opacity:0; transform:translateY(7px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes sgPanelIn {
          from { opacity:0; transform:translateY(18px) scale(.97); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes sgGlow {
          0%,100% { opacity:.5; transform:scale(1); }
          50%      { opacity:1; transform:scale(1.12); }
        }
        @keyframes sgPing {
          0%   { transform:scale(1); opacity:1; }
          80%  { transform:scale(2.4); opacity:0; }
          100% { opacity:0; }
        }
        @keyframes sgFloat {
          0%,100% { transform:translateY(0px); }
          50%      { transform:translateY(-7px); }
        }

        .sg-fab        { animation: sgFloat 3.2s ease-in-out infinite; transition: transform .2s; }
        .sg-fab:hover  { animation: none; transform: scale(1.1) !important; }
        .sg-hi         { animation: sgPop .48s cubic-bezier(.34,1.56,.64,1) both; }
        .sg-panel      { animation: sgPanelIn .3s cubic-bezier(.22,1,.36,1) both; }
        .sg-msg        { animation: sgFadeUp .2s ease both; }

        .sg-input::placeholder { color:rgba(255,255,255,0.28); }
        .sg-input:focus        { outline:none; }

        .sg-scroll::-webkit-scrollbar       { width:3px; }
        .sg-scroll::-webkit-scrollbar-track { background:transparent; }
        .sg-scroll::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.08); border-radius:10px; }

        .sg-chip:hover  { background:rgba(230,58,39,0.14) !important; border-color:rgba(230,58,39,0.45) !important; color:#e63a27 !important; }
        .sg-send:hover:not(:disabled) { background:#c42e1e !important; transform:scale(1.06); }
        .sg-send:active:not(:disabled) { transform:scale(.95); }
        .sg-close:hover { background:rgba(255,255,255,0.09) !important; }
        .sg-input-wrap:focus-within { border-color:rgba(230,58,39,0.35) !important; }
      `}</style>

      <div className="sg-root">

        {/* ── FAB ────────────────────────────────────────────── */}
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open chat"
            className="sg-fab"
            style={{
              position: 'fixed', bottom: 22, right: 22, zIndex: 9998,
              width: 64, height: 64, borderRadius: '50%',
              border: 'none', background: 'transparent',
              padding: 0, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'visible',
            }}
          >
            {/* Soft glow ring */}
            <span style={{
              position: 'absolute', inset: -8, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(230,58,39,0.22) 30%, transparent 70%)',
              animation: 'sgGlow 2.5s ease-in-out infinite',
            }} />
            {/* Image */}
            <span style={{ width: 62, height: 62, borderRadius: '50%', overflow: 'hidden', display: 'block', position: 'relative', aspectRatio: '1/1' }}>
              <Image src="/images/cartoon1.png" alt="Chat" fill className="object-cover" sizes="62px" unoptimized />
            </span>
            {/* Online ping */}
            <span style={{ position: 'absolute', top: 3, right: 3, width: 14, height: 14 }}>
              <span style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                background: '#22c55e', animation: 'sgPing 1.8s ease-out infinite',
              }} />
              <span style={{
                position: 'absolute', inset: 2, borderRadius: '50%',
                background: '#22c55e', border: '2px solid #0f0f0f',
              }} />
            </span>
            {/* Hi bubble */}
            {hiVisible && (
              <span key={hiBubbleKey} className="sg-hi" style={{
                position: 'absolute', left: '50%', top: -42,
                transform: 'translateX(-50%)',
                background: '#1c1c1c',
                border: '1px solid rgba(230,58,39,0.35)',
                color: '#e63a27',
                fontSize: 12, fontWeight: 600,
                padding: '5px 13px',
                borderRadius: 20, whiteSpace: 'nowrap',
                boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
              }}>
                Hi there! 👋
                <span style={{
                  position: 'absolute', bottom: -6, left: '50%', transform: 'translateX(-50%)',
                  width: 0, height: 0,
                  borderLeft: '6px solid transparent', borderRight: '6px solid transparent',
                  borderTop: '7px solid #1c1c1c',
                }} />
              </span>
            )}
          </button>
        )}

        {/* ── Backdrop ───────────────────────────────────────── */}
        {isOpen && (
          <div
            onClick={closeChat}
            style={{
              position: 'fixed', inset: 0, zIndex: 9997,
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
            }}
          />
        )}

        {/* ── Panel ──────────────────────────────────────────── */}
        {isOpen && (
          <div
            className={panelReady ? 'sg-panel' : ''}
            role="dialog"
            aria-label="Chat with Shanky Group"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'fixed',
              bottom: 22, right: 22,
              zIndex: 9998,
              width: 'min(400px, calc(100vw - 28px))',
              height: 'min(600px, calc(100vh - 44px))',
              borderRadius: 22,
              overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
              background: '#0f0f0f',
              border: '1px solid rgba(255,255,255,0.07)',
              boxShadow: '0 40px 100px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.03)',
            }}
          >
            {/* Top red glow */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: 220, pointerEvents: 'none', zIndex: 0,
              background: 'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(230,58,39,0.16) 0%, transparent 70%)',
            }} />

            {/* ── Header ────────────────────────────────────── */}
            <div style={{
              position: 'relative', zIndex: 1,
              padding: '14px 16px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'center', gap: 11,
              background: 'rgba(255,255,255,0.025)',
            }}>
              {/* Bot avatar */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', position: 'relative', boxShadow: '0 0 0 2px rgba(230,58,39,0.45)', aspectRatio: '1/1' }}>
                  <Image src="/images/logo_icon.png" alt="Bot" fill className="object-contain" sizes="40px" style={{ padding: '4px' }} unoptimized />
                </div>
                <span style={{
                  position: 'absolute', bottom: 0, right: 0,
                  width: 11, height: 11, borderRadius: '50%',
                  background: '#22c55e', border: '2px solid #0f0f0f',
                }} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#fff', letterSpacing: '-0.01em' }}>Shanky Group</p>
                <p style={{ margin: '2px 0 0', fontSize: 11, color: 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e', display: 'inline-block', flexShrink: 0 }} />
                  Online · Replies instantly
                </p>
              </div>

              <button
                type="button"
                className="sg-close"
                onClick={closeChat}
                aria-label="Close"
                style={{
                  width: 30, height: 30, borderRadius: 9,
                  border: '1px solid rgba(255,255,255,0.07)',
                  background: 'transparent', cursor: 'pointer',
                  color: 'rgba(255,255,255,0.45)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, transition: 'background .15s',
                }}
              >
                <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* ── Messages ──────────────────────────────────── */}
            <div
              className="sg-scroll"
              style={{
                flex: 1, overflowY: 'auto',
                padding: '14px 12px',
                display: 'flex', flexDirection: 'column', gap: 10,
                position: 'relative', zIndex: 1,
              }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className="sg-msg"
                  style={{
                    display: 'flex', alignItems: 'flex-end', gap: 7,
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  {msg.role === 'bot' && <BotAvatar sm />}

                  <div style={{ maxWidth: '76%' }}>
                    <div style={{
                      padding: '9px 13px',
                      fontSize: 13, lineHeight: 1.55, whiteSpace: 'pre-wrap',
                      borderRadius: msg.role === 'bot'
                        ? '16px 16px 16px 4px'
                        : '16px 16px 4px 16px',
                      ...(msg.role === 'bot' ? {
                        background: 'rgba(255,255,255,0.07)',
                        color: 'rgba(255,255,255,0.85)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      } : {
                        background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_DARK} 100%)`,
                        color: '#fff',
                      }),
                    }}>
                      {msg.text}
                    </div>
                    {msg.role === 'bot' && (
                      <ProviderBadge
                        provider={msg.provider}
                        fallbackReason={msg.fallbackReason}
                        fromApi={msg.fromApi}
                        apiError={msg.apiError}
                      />
                    )}
                  </div>

                  {msg.role === 'user' && <UserAvatar sm />}
                </div>
              ))}

              {/* Streaming */}
              {streamingMessage && (
                <div className="sg-msg" style={{ display: 'flex', alignItems: 'flex-end', gap: 7 }}>
                  <BotAvatar sm />
                  <div style={{ maxWidth: '76%' }}>
                    <div style={{
                      padding: '9px 13px',
                      borderRadius: '16px 16px 16px 4px',
                      fontSize: 13, lineHeight: 1.55, whiteSpace: 'pre-wrap',
                      background: 'rgba(255,255,255,0.07)',
                      color: 'rgba(255,255,255,0.85)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}>
                      {streamingMessage.fullText.slice(0, streamingMessage.displayed)}
                      <span style={{
                        display: 'inline-block', width: 1.5, height: 12,
                        background: 'rgba(255,255,255,0.6)',
                        marginLeft: 2, verticalAlign: 'middle',
                        animation: 'sgBounce .7s ease-in-out infinite',
                      }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Typing dots */}
              {isTyping && (
                <div className="sg-msg" style={{ display: 'flex', alignItems: 'flex-end', gap: 7 }}>
                  <BotAvatar sm />
                  <div style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '16px 16px 16px 4px',
                  }}>
                    <TypingDots />
                  </div>
                </div>
              )}

              {/* Quick replies */}
              {showQuickReplies && messages.length <= 1 && (
                <div className="sg-msg" style={{ display: 'flex', flexWrap: 'wrap', gap: 6, paddingLeft: 35, paddingTop: 2 }}>
                  {QUICK_REPLIES.map((qr) => (
                    <button
                      key={qr.label}
                      type="button"
                      className="sg-chip"
                      onClick={() => sendMessage(qr.text)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 20,
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: 'rgba(255,255,255,0.04)',
                        color: 'rgba(255,255,255,0.6)',
                        fontSize: 12, fontWeight: 500,
                        cursor: 'pointer', transition: 'all .15s',
                      }}
                    >
                      {qr.label}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Input ─────────────────────────────────────── */}
            <div style={{
              padding: '10px 12px 14px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(0,0,0,0.2)',
              position: 'relative', zIndex: 1,
            }}>
              <div
                className="sg-input-wrap"
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: 'rgba(255,255,255,0.055)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 14,
                  padding: '4px 4px 4px 13px',
                  transition: 'border-color .2s',
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Message Shanky Group…"
                  className="sg-input"
                  style={{
                    flex: 1, border: 'none', background: 'transparent',
                    fontSize: 13, color: '#fff',
                    padding: '7px 0',
                  }}
                />
                <button
                  type="button"
                  className="sg-send"
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  style={{
                    width: 34, height: 34, borderRadius: 10,
                    border: 'none',
                    background: inputValue.trim()
                      ? `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_DARK} 100%)`
                      : 'rgba(255,255,255,0.06)',
                    color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                    opacity: inputValue.trim() ? 1 : 0.35,
                    transition: 'all .15s',
                    boxShadow: inputValue.trim() ? '0 3px 12px rgba(230,58,39,0.35)' : 'none',
                  }}
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>

              <p style={{ textAlign: 'center', fontSize: 10, color: 'rgba(255,255,255,0.18)', marginTop: 9, marginBottom: 0 }}>
                Or{' '}
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  style={{ color: ACCENT, textDecoration: 'none', fontWeight: 500 }}
                >
                  visit our Contact page
                </Link>
                {' '}· Shanky Group © 2026
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}