import type { Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Chatbot from './components/Chatbot';
import ThemeSync from './ThemeSync';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

// Inline script: default = dark; only light when user has chosen 'light'
const themeScript = `
(function(){
  try {
    var s = localStorage.getItem('theme');
    var dark = s === 'dark' || (s !== 'light' && s !== 'dark');
    document.documentElement.classList.toggle('dark', !!dark);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning style={{ zoom: 0.8 }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <ThemeSync />
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
