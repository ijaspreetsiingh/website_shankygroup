'use client';

import { useEffect } from 'react';

export default function ThemeSync() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const applyTheme = () => {
      const saved = localStorage.getItem('theme');
      const isDark =
        saved === 'dark' || (saved !== 'light' && mediaQuery.matches);
      document.documentElement.classList.toggle('dark', isDark);
    };

    applyTheme();
    const onSystemThemeChange = () => {
      // System change only affects when user has no explicit saved preference
      applyTheme();
    };

    mediaQuery.addEventListener('change', onSystemThemeChange);
    return () => {
      mediaQuery.removeEventListener('change', onSystemThemeChange);
    };
  }, []);
  return null;
}
