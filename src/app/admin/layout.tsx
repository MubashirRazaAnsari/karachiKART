import { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import AdminNavigation from './components/AdminNavigation';
import { authOptions } from '../api/auth/authOptions';

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Manage your admin account and listings'
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex pt-2">
        <AdminNavigation />
        <main className="flex-1 p-2 overflow-auto max-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
} 