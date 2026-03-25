import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Read Shanky Group insights, updates, and articles on business, technology, leadership, and growth.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog | Shanky Group',
    description:
      'Latest articles and updates from Shanky Group.',
    url: '/blog',
    type: 'website',
  },
};

export default function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
