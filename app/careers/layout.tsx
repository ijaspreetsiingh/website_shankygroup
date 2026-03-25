import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Explore career opportunities at Shanky Group across finance, technology, operations, and corporate functions.',
  alternates: {
    canonical: '/careers',
  },
  openGraph: {
    title: 'Careers | Shanky Group',
    description:
      'Join Shanky Group and build your career with a fast-growing multi-business organization.',
    url: '/careers',
    type: 'website',
  },
};

export default function CareersLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
