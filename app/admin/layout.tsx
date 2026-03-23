import type { ReactNode } from 'react';
import SidebarLayout from './_components/SidebarLayout';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarLayout>
      {children}
    </SidebarLayout>
  );
}
