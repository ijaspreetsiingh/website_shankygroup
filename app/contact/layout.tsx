import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact Shanky Group for business inquiries, partnerships, support, and corporate communication.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Us | Shanky Group',
    description:
      'Reach the Shanky Group team for business and partnership opportunities.',
    url: '/contact',
    type: 'website',
  },
};

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
