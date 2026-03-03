'use client';

import { useEffect } from 'react';

export default function ThemeSync() {
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const systemPrefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = saved === 'dark' || ((saved !== 'light' && saved !== 'dark') && systemPrefersDark);

    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  return null;
}
