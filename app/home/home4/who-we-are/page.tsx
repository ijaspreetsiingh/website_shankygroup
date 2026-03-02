 'use client';
 
 import { useEffect } from 'react';
 import { useRouter } from 'next/navigation';
 
 export default function WhoWeAreIndex() {
   const router = useRouter();
   useEffect(() => {
     router.replace('/home/home4/who-we-are/about-us');
   }, [router]);
   return null;
 }
