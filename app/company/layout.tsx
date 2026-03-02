'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import HeaderFour from '../home/home4/HeaderFour';
import FooterFour from '../home/home4/FooterFour';

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  const isShankyFinancialPvtLtd = pathname?.includes('shanky-financial-pvt-ltd');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full overflow-x-hidden min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <HeaderFour isScrolled={isScrolled} />
      <main className="flex-grow">{children}</main>
      {!isShankyFinancialPvtLtd && <FooterFour />}
    </div>
  );
}