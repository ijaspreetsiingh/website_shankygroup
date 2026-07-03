import { Metadata } from 'next';
import InvestmentClient from './page-client';

// Strong SEO Metadata - Server Component
export const metadata: Metadata = {
  title: "Invest in NCD | 14% Fixed Annual Returns | Shanky Group",
  description: "Earn 14% guaranteed annual returns with Shanky Group's secured NCD investment. Fixed annual income, asset-backed security, minimum investment ₹5 Crore.",
  keywords: [
    "NCD investment India",
    "14% fixed returns",
    "secured NCD bonds",
    "high return investment India",
    "Shanky Group NCD",
    "fixed deposit alternative",
    "annual income investment",
    "monthly income investment",
    "HNI investment options",
    "asset backed NCD",
    "₹5 crore investment plan",
    "wealth management India",
    "fixed income securities",
    "corporate NCD",
    "best NCD 2026",
    "guaranteed returns investment",
  ],
  alternates: {
    canonical: 'https://shankygroup.com/investment',
  },
  openGraph: {
    title: "Invest in NCD | 14% Fixed Annual Returns | Shanky Group",
    description: "Earn 14% guaranteed annual returns with Shanky Group's secured NCD investment. Fixed annual income, asset-backed security, minimum ₹5 Crore.",
    url: 'https://shankygroup.com/investment',
    images: [{ url: '/investment/ncd.png', width: 1200, height: 630, alt: 'Shanky Group NCD Investment - 14% Returns' }],
    siteName: "Shanky Group",
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Invest in NCD | 14% Fixed Annual Returns | Shanky Group",
    description: "Earn 14% guaranteed annual returns with Shanky Group's secured NCD investment. Minimum ₹5 Crore.",
    images: ['/investment/ncd.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// JSON-LD Structured Data for rich snippets
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FinancialProduct',
  name: 'Shanky Group Secured NCD',
  description: '14% fixed annual returns with asset-backed security and quarterly payouts',
  provider: {
    '@type': 'Organization',
    name: 'Shanky Group',
    url: 'https://shankygroup.com',
    telephone: '+91-11-47586938',
    email: 'info@shankygroup.com',
  },
  interestRate: {
    '@type': 'QuantitativeValue',
    value: 14,
    unitText: 'PERCENT',
  },
  feesAndCommissionsSpecification: 'No hidden charges. Transparent documentation.',
};

// FAQ Schema for NCD Investment
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Shanky Group NCD returns',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Shanky Group NCD offers 14% fixed annual returns with quarterly payouts. Minimum investment is ₹5 Crore with asset-backed security.',
      },
    },
    {
      '@type': 'Question',
      name: 'NCD investment minimum amount',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Minimum investment for Shanky Group NCD is ₹5 Crore. Maximum investment can go up to ₹100 Crore.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is NCD investment safe',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Shanky Group NCD is asset-backed secured investment with legal documentation. Every NCD is collateralized with tangible assets ensuring capital protection.',
      },
    },
    {
      '@type': 'Question',
      name: 'NCD payout frequency',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Shanky Group NCD offers quarterly payouts. Returns are credited directly to your bank account every quarter.',
      },
    },
    {
      '@type': 'Question',
      name: 'How to invest in NCD',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To invest in Shanky Group NCD, submit the investment inquiry form on our website or contact us at +91-11-47586938. Our team will guide you through the documentation process.',
      },
    },
    {
      '@type': 'Question',
      name: 'NCD vs fixed deposit',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NCD offers higher returns (14%) compared to fixed deposits (6-7%). Shanky Group NCD is asset-backed with quarterly payouts, making it a better alternative for HNI investors.',
      },
    },
    {
      '@type': 'Question',
      name: 'Shanky Group NCD documents required',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Documents required for NCD investment include PAN card, Aadhaar card, bank account details, and KYC documents. Our team will guide you through the complete process.',
      },
    },
  ],
};

export default function InvestmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <InvestmentClient />
    </>
  );
}
