import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Syne, DM_Sans } from 'next/font/google';
import './globals.css';
import Chatbot from './components/Chatbot';
import ThemeSync from './ThemeSync';
import { getSiteUrl } from './lib/site-url';

const siteUrl = getSiteUrl();
const logoUrl = 'https://shankygroup.com/images/logo_icon.png';
const importantSiteLinks = [
  `${siteUrl}/who-we-are/about-us`,
  `${siteUrl}/who-we-are/mission-vision`,
  `${siteUrl}/who-we-are/leadership`,
  `${siteUrl}/company`,
  `${siteUrl}/careers`,
  `${siteUrl}/contact`,
];
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteUrl}#organization`,
  name: 'Shanky Group',
  alternateName: 'Shanky Group India',
  url: siteUrl,
  logo: logoUrl,
  description:
    'Shanky Group is a multi-business organization focused on finance, technology, training, and industrial growth.',
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}#website`,
  name: 'Shanky Group',
  url: siteUrl,
  inLanguage: 'en-IN',
  publisher: {
    '@id': `${siteUrl}#organization`,
  },
  hasPart: importantSiteLinks.map((url) => ({
    '@type': 'WebPage',
    url,
  })),
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteUrl}/blog?query={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

const homeWebPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${siteUrl}/#webpage`,
  url: siteUrl,
  name: 'Shanky Group | Empowering Businesses Across Industries',
  description:
    'Shanky Group is a multi-business organization focused on finance, technology, training, and industrial growth with a strong people-first vision.',
  isPartOf: {
    '@id': `${siteUrl}#website`,
  },
  about: {
    '@id': `${siteUrl}#organization`,
  },
  significantLink: importantSiteLinks,
};

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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Shanky Group | Empowering Businesses Across Industries',
    template: '%s | Shanky Group',
  },
  icons: {
    icon: logoUrl,
    shortcut: logoUrl,
    apple: logoUrl,
  },
  description:
    'Shanky Group is a multi-business organization focused on finance, technology, training, and industrial growth with a strong people-first vision.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Shanky Group',
    description:
      'Discover Shanky Group companies, leadership, careers, and insights across finance, technology, and industrial sectors.',
    url: '/',
    siteName: 'Shanky Group',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: logoUrl,
        width: 512,
        height: 512,
        alt: 'Shanky Group',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shanky Group',
    description:
      'Explore Shanky Group businesses, leadership, and opportunities.',
    images: [logoUrl],
  },
  keywords: [
    'Shanky Group',
    'Shanky Group India',
    'Shanky Financial',
    'Shanky Corporate Training',
    'Shanky Smart Tech',
  ],
  verification: {
    google:
      process.env.GOOGLE_SITE_VERIFICATION ||
      'CB4LkkdQ_5A14uaJrrLJgiTeiT5zRv6HWk--TEzC7J4',
  },
};

// Inline script: follow saved preference, fallback to OS theme
const themeScript = `
(function(){
  try {
    var saved = localStorage.getItem('theme');
    var dark = saved === 'dark' || (saved !== 'light' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
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
        <link
          rel="icon"
          href={logoUrl}
          type="image/png"
          sizes="512x512"
        />
        <link
          rel="apple-touch-icon"
          href={logoUrl}
          sizes="512x512"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, '\\u003c'),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd).replace(/</g, '\\u003c'),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(homeWebPageJsonLd).replace(/</g, '\\u003c'),
          }}
        />
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
