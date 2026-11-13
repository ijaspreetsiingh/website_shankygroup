import type { ReactNode } from 'react';
import SidebarLayout from './_components/SidebarLayout';
import './admin-styles.css';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarLayout>
      {children}
    </SidebarLayout>
  );
}
