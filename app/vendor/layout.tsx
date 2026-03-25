import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vendor Registration',
  description:
    'Register as a vendor with Shanky Group to explore procurement and business collaboration opportunities.',
  alternates: {
    canonical: '/vendor',
  },
  openGraph: {
    title: 'Vendor Registration | Shanky Group',
    description:
      'Submit your vendor registration details and collaborate with Shanky Group.',
    url: '/vendor',
    type: 'website',
  },
};

export default function VendorLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
