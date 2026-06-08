import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  BRAND_LOGO_PATHS,
  BRAND_LOGO_SIZE,
  getBrandLogoImageObjects,
  getBrandLogoUrl,
} from '../lib/brand-logos';
import { getSiteUrl } from '../lib/site-url';

const siteUrl = getSiteUrl();
const brandImages = getBrandLogoImageObjects(siteUrl);

export const metadata: Metadata = {
  title: 'Shanky Group Logo | Official Brand Assets',
  description:
    'Download and view the official Shanky Group logos for light and dark backgrounds. Official brand assets for Shanky Group India.',
  alternates: {
    canonical: '/brand',
  },
  keywords: [
    'Shanky Group logo',
    'Shanky Group brand',
    'Shanky Group official logo',
    'Shanky Group dark logo',
    'Shanky Group India logo',
  ],
  openGraph: {
    title: 'Shanky Group Logo | Official Brand Assets',
    description:
      'Official Shanky Group logos for light and dark backgrounds.',
    url: '/brand',
    siteName: 'Shanky Group',
    locale: 'en_IN',
    type: 'website',
    images: brandImages.map((image) => ({
      url: image.url,
      width: image.width,
      height: image.height,
      alt: image.caption,
      type: 'image/png',
    })),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shanky Group Logo | Official Brand Assets',
    description: 'Official Shanky Group logos for light and dark backgrounds.',
    images: brandImages.map((image) => image.url),
  },
};

const brandGalleryJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  '@id': `${siteUrl}/brand#gallery`,
  name: 'Shanky Group Official Logos',
  description:
    'Official Shanky Group brand logos for light and dark backgrounds.',
  url: `${siteUrl}/brand`,
  about: {
    '@type': 'Organization',
    '@id': `${siteUrl}#organization`,
    name: 'Shanky Group',
  },
  image: brandImages,
};

export default function BrandPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(brandGalleryJsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-8"
        >
          ← Back to Home
        </Link>

        <header className="mb-10 sm:mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#e63a27] mb-3">
            Brand Assets
          </p>
          <h1 className="section-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Shanky Group Official Logos
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-3xl leading-relaxed">
            Official Shanky Group logos for light and dark backgrounds. These
            assets are used across the Shanky Group website, communications, and
            digital platforms.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <figure className="rounded-2xl border border-[var(--card-border)] bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-center min-h-[220px] sm:min-h-[260px]">
              <Image
                src={BRAND_LOGO_PATHS.light}
                alt="Shanky Group official logo for light backgrounds"
                title="Shanky Group Logo - Light Mode"
                width={BRAND_LOGO_SIZE.width}
                height={BRAND_LOGO_SIZE.height}
                className="h-auto w-full max-w-[280px] object-contain"
                priority
              />
            </div>
            <figcaption className="mt-6 border-t border-[var(--card-border)] pt-5">
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                Light Background Logo
              </h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                Use on white and light backgrounds across websites, documents,
                and presentations.
              </p>
              <a
                href={getBrandLogoUrl('light')}
                className="text-sm font-semibold text-[#e63a27] hover:underline"
              >
                View full image
              </a>
            </figcaption>
          </figure>

          <figure className="rounded-2xl border border-[var(--card-border)] bg-[#0f1115] p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-center min-h-[220px] sm:min-h-[260px]">
              <Image
                src={BRAND_LOGO_PATHS.dark}
                alt="Shanky Group official logo for dark backgrounds"
                title="Shanky Group Logo - Dark Mode"
                width={BRAND_LOGO_SIZE.width}
                height={BRAND_LOGO_SIZE.height}
                className="h-auto w-full max-w-[280px] object-contain"
              />
            </div>
            <figcaption className="mt-6 border-t border-white/10 pt-5">
              <h2 className="text-lg font-bold text-white mb-2">
                Dark Background Logo
              </h2>
              <p className="text-sm text-white/70 leading-relaxed mb-4">
                Use on dark backgrounds, night mode interfaces, and premium dark
                brand applications.
              </p>
              <a
                href={getBrandLogoUrl('dark')}
                className="text-sm font-semibold text-[#ff7a6d] hover:underline"
              >
                View full image
              </a>
            </figcaption>
          </figure>
        </div>
      </div>
    </main>
  );
}
