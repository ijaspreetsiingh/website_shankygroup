import { Metadata } from 'next';
import InvestmentClient from './page-client';

// Strong SEO Metadata - Server Component
export const metadata: Metadata = {
  title: "Invest in NCD | 14% Fixed Annual Returns | Shanky Group",
  description: "Earn 14% guaranteed annual returns with Shanky Group's secured NCD investment. Fixed annual income, asset-backed security, minimum investment ₹5 Crore. Trusted by HNI investors across India.",
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
  description: '14% fixed annual returns with asset-backed security and monthly payouts',
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

export default function InvestmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <InvestmentClient />
    </>
  );
}
