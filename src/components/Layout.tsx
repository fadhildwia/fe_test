import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import React from 'react';
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';

const inter = Inter({ subsets: ['latin'] });

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();

  return (
    <div className={inter.className}>
      {['dashboard'].includes(router.pathname.split('/')[1]) && <Sidebar />}
      <div className={`${['dashboard'].includes(router.pathname.split('/')[1]) && 'md:ml-[260px]'}`}>
        {['dashboard'].includes(router.pathname.split('/')[1]) && <AdminNavbar />}
        {children}
      </div>
    </div>
  );
};
