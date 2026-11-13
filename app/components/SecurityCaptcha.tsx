'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface SecurityCaptchaProps {
  onTokenChange: (token: string) => void;
  onAnswerChange: (answer: string) => void;
  onHoneypotChange?: (val: string) => void;
  answerValue: string;
  errorMessage?: string | null;
  refreshKey?: number;
  disabled?: boolean;
}

export default function SecurityCaptcha({
  onTokenChange,
  onAnswerChange,
  onHoneypotChange,
  answerValue,
  errorMessage,
  refreshKey,
  disabled = false,
}: SecurityCaptchaProps) {
  const [svgUrl, setSvgUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isRotating, setIsRotating] = useState<boolean>(false);

  const fetchCaptcha = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    setIsRotating(true);
    try {
      const res = await fetch(`/api/captcha?_t=${Date.now()}`, {
        cache: 'no-store',
      });
      if (!res.ok) {
        throw new Error('Failed to load security challenge');
      }
      const data = await res.json();
      if (data.success && data.token && data.svg) {
        setSvgUrl(data.svg);
        onTokenChange(data.token);
        onAnswerChange(''); // clear previous answer on new challenge
      } else {
        throw new Error(data.message || 'Invalid challenge response');
      }
    } catch (err: unknown) {
      console.error('Captcha fetch error:', err);
      setLoadError('Unable to load security verification. Please click refresh.');
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsRotating(false), 500);
    }
  }, [onTokenChange, onAnswerChange]);

  // Initial load
  useEffect(() => {
    fetchCaptcha();
  }, [fetchCaptcha]);

  // Handle external refresh trigger
  useEffect(() => {
    if (refreshKey && refreshKey > 0) {
      fetchCaptcha();
    }
  }, [refreshKey, fetchCaptcha]);

  return (
    <div className="w-full space-y-2 select-none">
      {/* Hidden honeypot field for bot trapping */}
      <input
        type="text"
        name="hp_shield"
        tabIndex={-1}
        autoComplete="off"
        className="hidden opacity-0 pointer-events-none absolute -left-[9999px] -top-[9999px]"
        onChange={(e) => onHoneypotChange?.(e.target.value)}
        aria-hidden="true"
      />

      <div className="flex items-center justify-between">
        <label className="block text-xs sm:text-sm font-medium text-white/90">
          Security Verification <span className="text-[#ff6b6b]">*</span>
          <span className="ml-1 text-[11px] font-normal text-white/70">
            (Solve math to prove human)
          </span>
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-3 items-center">
        {/* Captcha image & refresh button */}
        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-2 rounded-xl border border-white/20 shadow-inner">
          {isLoading ? (
            <div className="w-[180px] h-[48px] flex items-center justify-center bg-zinc-900/80 rounded-lg">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          ) : svgUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={svgUrl}
              alt="Security Challenge"
              className="w-[180px] h-[48px] rounded-lg object-contain shadow-sm pointer-events-none"
              draggable={false}
            />
          ) : (
            <div className="w-[180px] h-[48px] flex items-center justify-center bg-zinc-900/80 rounded-lg text-xs text-red-400 text-center px-2">
              {loadError || 'Error'}
            </div>
          )}

          {/* Refresh button */}
          <button
            type="button"
            onClick={fetchCaptcha}
            disabled={isLoading || disabled}
            title="Click to get a new math problem"
            className="p-2.5 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 transition-all text-white/90 hover:text-white disabled:opacity-50"
          >
            <svg
              className={`w-5 h-5 transition-transform duration-500 ${isRotating ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>

        {/* User Answer Input */}
        <div className="relative">
          <input
            type="number"
            value={answerValue}
            onChange={(e) => onAnswerChange(e.target.value)}
            disabled={disabled}
            required
            placeholder="Enter answer"
            className="w-full px-4 py-3 sm:py-3.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-sm sm:text-base text-white placeholder-white/60 outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all min-h-[48px]"
          />
        </div>
      </div>

      {/* Error message display */}
      {errorMessage && (
        <div className="flex items-center gap-2 p-2.5 bg-red-950/70 border border-red-500/50 rounded-xl text-xs sm:text-sm text-red-200 animate-fadeIn">
          <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
