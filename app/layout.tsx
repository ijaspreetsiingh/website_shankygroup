'use client';

import { Geist, Geist_Mono } from "next/font/google";
import { useEffect } from "react";
import "./globals.css";
import Chatbot from "./components/Chatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Inline script: runs before React so user's theme choice (e.g. light on a dark device) applies immediately
const themeScript = `
(function(){
  try {
    var s = localStorage.getItem('theme');
    var dark = s === 'dark' || (s !== 'light' && s !== 'dark' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', !!dark);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    // Sync theme from localStorage (respect explicit 'light' / 'dark'; only fallback to system when no choice)
    const saved = localStorage.getItem('theme');
    const systemPrefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = saved === 'dark' || ((saved !== 'light' && saved !== 'dark') && systemPrefersDark);

    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
        <Chatbot />
      </body>
    </html>
  );
}