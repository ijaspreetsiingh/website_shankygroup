'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getReplyFromKnowledge } from '../lib/chatbot-knowledge';

const ACCENT = '#e63a27';

const QUICK_REPLIES = [
  { label: 'Contact us', text: 'I want to get in touch with your team.' },
  { label: 'Our companies', text: 'Tell me about your companies and businesses.' },
  { label: 'Careers', text: 'I am interested in career opportunities.' },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string; fromApi?: boolean; apiError?: string; provider?: 'gemini' | 'openrouter' | 'groq' | 'fallback'; fallbackReason?: string }[]>([
    { role: 'bot', text: 'Hello! Welcome to Shanky Group. How can we help you today?', fromApi: true, provider: 'fallback' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState<{
    fullText: string;
    displayed: number;
    fromApi?: boolean;
    apiError?: string;
    provider?: 'gemini' | 'openrouter' | 'groq' | 'fallback';
    fallbackReason?: string;
  } | null>(null);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [hiVisible, setHiVisible] = useState(false);
  const [hiBubbleKey, setHiBubbleKey] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const TYPING_SPEED_MS = 18;
  const TYPING_CHUNK = 2;
  useEffect(() => {
    if (!streamingMessage) return;
    const { fullText, displayed } = streamingMessage;
    if (displayed >= fullText.length) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          text: fullText,
          fromApi: streamingMessage.fromApi,
          apiError: streamingMessage.apiError,
          provider: streamingMessage.provider,
          fallbackReason: streamingMessage.fallbackReason,
        },
      ]);
      setStreamingMessage(null);
      return;
    }
    const id = setInterval(() => {
      setStreamingMessage((prev) => {
        if (!prev) return null;
        const next = Math.min(prev.displayed + TYPING_CHUNK, prev.fullText.length);
        return { ...prev, displayed: next };
      });
    }, TYPING_SPEED_MS);
    return () => clearInterval(id);
  }, [streamingMessage]);

  // 5 sec baad show, show hone ke 3 sec baad hide, phir 5 sec baad dubara show (cycle)
  useEffect(() => {
    if (isOpen) return;
    let showTimer: ReturnType<typeof setTimeout>;
    let hideTimer: ReturnType<typeof setTimeout>;
    const show = () => {
      setHiVisible(true);
      setHiBubbleKey((k) => k + 1);
      hideTimer = setTimeout(hide, 3000);
    };
    const hide = () => {
      setHiVisible(false);
      showTimer = setTimeout(show, 5000);
    };
    showTimer = setTimeout(show, 5000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, streamingMessage]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setShowQuickReplies(false);
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setInputValue('');
    setIsTyping(true);

    const history = messages.map((m) => ({
      role: m.role === 'bot' ? 'assistant' : 'user',
      content: m.text,
    }));

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history, message: trimmed }),
      });
      const data = await res.json().catch(() => ({}));
      const fromApi = res.ok && typeof data.reply === 'string';
      const knowledgeResult = getReplyFromKnowledge(trimmed);
      const answerText = fromApi ? data.reply : (typeof knowledgeResult === 'string' ? knowledgeResult : knowledgeResult.answer);
      const apiError = !res.ok ? (typeof data.error === 'string' ? data.error : data.details || 'API error') : undefined;
      const provider = fromApi && data.provider ? data.provider : undefined;
      const fallbackReason = typeof data.fallbackReason === 'string' ? data.fallbackReason : undefined;
      setIsTyping(false);
      setStreamingMessage({ fullText: answerText, displayed: 0, fromApi, apiError, provider, fallbackReason });
    } catch {
      const knowledgeResult = getReplyFromKnowledge(trimmed);
      const answerText = typeof knowledgeResult === 'string' ? knowledgeResult : knowledgeResult.answer;
      setIsTyping(false);
      setStreamingMessage({ fullText: answerText, displayed: 0, fromApi: false, apiError: 'Network error' });
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = () => sendMessage(inputValue);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickReply = (text: string) => sendMessage(text);

  return (
    <>
      {/* "Hi" speech bubble keyframes - boy saying Hi */}
      <style jsx>{`
        @keyframes hiPop {
          0% {
            opacity: 0;
            transform: translate(-50%, 10px) scale(0.7);
          }
          50% {
            transform: translate(-50%, -4px) scale(1.05);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, 0) scale(1);
          }
        }
        .hi-bubble {
          animation: hiPop 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
      `}</style>

      {/* Floating button - hide when chat is open */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-[9998] w-20 h-20 sm:w-32 sm:h-32 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#e63a27]/30 overflow-visible bg-transparent group animate-bounce hover:animate-pulse"
          aria-label="Open chat"
        >
          <span className="block w-full h-full rounded-full overflow-hidden relative">
            <Image
              src="/images/cartoon1.png"
              alt="Chat with us"
              fill
              className="object-cover rounded-full"
              sizes="(max-width: 640px) 80px, 128px"
              unoptimized={true}
            />
          </span>
          {/* Speech bubble - 5 sec baad show, 3 sec baad hide */}
          {hiVisible && (
            <span
              key={hiBubbleKey}
              className="hi-bubble absolute left-1/2 -top-8 sm:-top-11 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-white px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-bold shadow-lg border border-[#e63a27]/20"
              style={{ color: ACCENT }}
            >
              Hi!
              <span
                className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-white"
                aria-hidden
              />
            </span>
          )}
          <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-6 sm:h-6 bg-red-500 rounded-full flex items-center justify-center animate-ping">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"></div>
          </div>
        </button>
      )}

      {/* Backdrop + Chat panel */}
      <div
        className={`fixed inset-0 z-[9997] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isOpen}
      >
        {/* Backdrop - click to close; blur first to avoid aria-hidden + focused descendant */}
        <button
          type="button"
          onClick={() => {
            (document.activeElement as HTMLElement)?.blur();
            setIsOpen(false);
          }}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          aria-label="Close chat"
        />

        {/* Panel - slide up + fade */}
        <div
          className={`absolute bottom-0 right-0 left-0 sm:left-auto sm:right-4 sm:bottom-4 w-full sm:max-w-md sm:h-[min(80vh,560px)] h-[75vh] sm:h-[85vh] rounded-t-2xl sm:rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ease-out ${
            isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          role="dialog"
          aria-label="Chat"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 sm:py-3.5 border-b border-white/10"
            style={{ backgroundColor: ACCENT }}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-xs sm:text-sm truncate">Shanky Group</p>
              <p className="text-white/80 text-xs truncate hidden sm:block">We typically reply within 24 hours</p>
            </div>
            <button
              type="button"
              onClick={() => {
                (document.activeElement as HTMLElement)?.blur();
                setIsOpen(false);
              }}
              className="p-1.5 sm:p-2 rounded-xl text-white/90 hover:bg-white/20 transition-colors flex-shrink-0"
              aria-label="Close"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 min-h-0 bg-[var(--background)]/30">
            {messages.map((msg, i) => {
              return (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-200`}
                >
                  <div className="max-w-[85%] sm:max-w-[88%]">
                    <div
                      className={`rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'text-white rounded-br-md shadow-md'
                          : 'bg-[var(--card-bg)] text-[var(--text-primary)] border border-[var(--card-border)] rounded-bl-md shadow-sm'
                      } ${msg.role === 'bot' ? 'whitespace-pre-wrap' : ''}`}
                      style={msg.role === 'user' ? { backgroundColor: ACCENT } : undefined}
                    >
                      {msg.text}
                    </div>
                    {msg.role === 'bot' && (
                      <span className="text-[9px] sm:text-[10px] text-[var(--text-secondary)] mt-1 block px-1">
                        {msg.provider === 'gemini' && '🟢 Chatbot 1'}
                        {msg.provider === 'openrouter' && '🟡 Chatbot 2'}
                        {msg.provider === 'groq' && '🔵 Chatbot 3'}
                        {msg.provider === 'fallback' && (
                          <>⚪ Fallback {msg.fallbackReason && <span className="text-[#e63a27]">— {msg.fallbackReason}</span>}</>
                        )}
                        {msg.fromApi === false && !msg.provider && 'Offline'}
                        {msg.apiError && <span className="block mt-0.5 text-[#e63a27]">{msg.apiError}</span>}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Streaming typing effect — AI reply appears character by character */}
            {streamingMessage && (
              <div className="flex justify-start animate-in fade-in duration-200">
                <div className="max-w-[85%] sm:max-w-[88%]">
                  <div className="rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap bg-[var(--card-bg)] text-[var(--text-primary)] border border-[var(--card-border)] rounded-bl-md shadow-sm">
                    {streamingMessage.fullText.slice(0, streamingMessage.displayed)}
                    <span className="inline-block w-0.5 h-3 sm:h-4 align-middle bg-[var(--text-primary)] animate-pulse ml-0.5" aria-hidden />
                  </div>
                </div>
              </div>
            )}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start animate-in fade-in duration-200">
                <div className="rounded-2xl rounded-bl-md px-3 py-2.5 sm:px-4 sm:py-3 bg-[var(--card-bg)] border border-[var(--card-border)] shadow-sm">
                  <div className="flex gap-1 sm:gap-1.5">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[var(--text-secondary)] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[var(--text-secondary)] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[var(--text-secondary)] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            {/* Quick reply chips - only when no user messages yet */}
            {showQuickReplies && messages.length <= 1 && (
              <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                {QUICK_REPLIES.map((qr) => (
                  <button
                    key={qr.label}
                    type="button"
                    onClick={() => handleQuickReply(qr.text)}
                    className="rounded-full px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-xs font-medium border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--text-primary)] hover:border-[#e63a27]/50 hover:bg-[#e63a27]/10 transition-colors"
                  >
                    {qr.label}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="p-2.5 sm:p-3 border-t border-[var(--card-border)] bg-[var(--card-bg)]">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 rounded-xl border border-[var(--card-border)] bg-[var(--background)] px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[#e63a27]/40 focus:border-transparent transition-shadow"
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 text-white text-xs sm:text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[#e63a27]/40 focus:ring-offset-2 focus:ring-offset-[var(--card-bg)]"
                style={{ backgroundColor: ACCENT }}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
            <p className="text-[9px] sm:text-[10px] text-[var(--text-secondary)] mt-1.5 sm:mt-2 text-center">
              Or <Link href="/contact" className="text-[#e63a27] hover:underline font-medium" onClick={() => setIsOpen(false)}>visit Contact page</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
