'use client';

import { useEffect } from 'react';

export default function ThemeSync() {
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const shouldBeDark = saved === 'dark' || (saved !== 'light' && saved !== 'dark');

    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  return null;
}
