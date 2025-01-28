import { generateMetadata, baseViewport } from '@/lib/metadata';
import ProviderNavigation from '@/app/components/provider/ProviderNavigation';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/authOptions';

export const metadata = generateMetadata(
  'Provider Dashboard',
  'Manage your service provider account and services'
);

export const viewport = baseViewport;

export default async function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  
  if (!session) {
    redirect('/auth/signin');
  }

  if (session.user.role !== 'provider' && session.user.role !== 'admin') {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex pt-2">
        <ProviderNavigation />
        <main className="flex-1 p-2 overflow-auto max-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
} 