import type { Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Syne, DM_Sans } from 'next/font/google';
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

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  weight: ['600', '700', '800'],
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
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
  const bodyClassName = [
    geistSans.variable,
    geistMono.variable,
    syne.variable,
    dmSans.variable,
    'antialiased',
    'bg-[var(--background)]',
    'text-[var(--foreground)]',
  ].join(' ');

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/logo_icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/logo_icon.png" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&display=swap"
        />
      </head>
      <body className={bodyClassName}>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <ThemeSync />
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
