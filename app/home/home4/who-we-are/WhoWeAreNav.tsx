 'use client';
 
 import Link from 'next/link';
 import { usePathname } from 'next/navigation';
 
 export default function WhoWeAreNav() {
   const pathname = usePathname();
 
   const linkBase = '/home/home4/who-we-are';
   const items = [
     { href: `${linkBase}/about-us`, label: 'About Us' },
     { href: `${linkBase}/leadership`, label: 'Leadership' },
     { href: `${linkBase}/mission-vision`, label: 'Mission & Vision' },
   ];
 
   return (
     <div className="flex items-center gap-2 md:gap-4 mt-3">
       <div className="w-8 h-[2px] bg-[var(--text-primary)]/80"></div>
       {items.map((item, idx) => {
         const active = pathname === item.href;
         return (
           <div key={item.href} className="flex items-center gap-2">
             <Link
               href={item.href}
               className={`uppercase tracking-[1.5px] text-[12px] md:text-[13px] ${
                 active ? 'text-[var(--text-primary)] font-semibold' : 'text-[var(--text-primary)]/80 hover:text-[var(--text-primary)]'
               }`}
             >
               {item.label}
             </Link>
             {idx < items.length - 1 && <span className="text-[var(--text-primary)]/50">/</span>}
           </div>
         );
       })}
     </div>
   );
 }
