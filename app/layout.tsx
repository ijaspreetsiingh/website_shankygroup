import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Syne, DM_Sans } from 'next/font/google';
import './globals.css';
import Chatbot from './components/Chatbot';
import ThemeSync from './ThemeSync';
import {
  getBrandLogoImageObjects,
  getBrandLogoUrl,
  getBrandOpenGraphImages,
} from './lib/brand-logos';
import { getSiteUrl } from './lib/site-url';

const siteUrl = getSiteUrl();
// Browser tab / bookmark favicon only — keep logo_icon.png; do NOT swap with brand logos.
const SITE_FAVICON_URL = 'https://shankygroup.com/images/logo_icon.png';
const primaryLogoUrl = getBrandLogoUrl('light');
const brandLogoImages = getBrandLogoImageObjects(siteUrl);
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
  logo: brandLogoImages[0],
  image: brandLogoImages,
  description:
    'Shanky Group is a multi-business organization focused on finance, technology, training, and industrial growth.',
  sameAs: [
    'https://www.facebook.com/share/1Hcjvg7fAr/',
    'https://x.com/ShankyGroup',
    'https://www.linkedin.com/company/shankygroup',
    'https://www.instagram.com/shankygroup.in/',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '120',
  },
  aggregateTurnover: {
    '@type': 'QuantitativeValue',
    name: 'Total Group Turnover FY 2025-26',
    value: '300',
    unitText: 'Crore INR',
    currency: 'INR',
  },
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
    icon: SITE_FAVICON_URL,
    shortcut: SITE_FAVICON_URL,
    apple: SITE_FAVICON_URL,
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
    images: getBrandOpenGraphImages(),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shanky Group',
    description:
      'Explore Shanky Group businesses, leadership, and opportunities.',
    images: brandLogoImages.map((image) => image.url),
  },
  keywords: [
    'Shanky Group',
    'Shanky Group logo',
    'Shanky Group official logo',
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
        {/* Favicon: logo_icon.png only — not brand logos */}
        <link rel="icon" href={SITE_FAVICON_URL} type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href={SITE_FAVICON_URL} sizes="512x512" />
        <meta itemProp="logo" content={primaryLogoUrl} />
        <meta itemProp="image" content={primaryLogoUrl} />
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
