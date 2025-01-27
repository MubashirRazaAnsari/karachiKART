'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'CredentialsSignin':
        return 'Invalid email or password';
      case 'Configuration':
        return 'There is a problem with the server configuration';
      case 'AccessDenied':
        return 'You do not have permission to sign in';
      case 'Verification':
        return 'The verification link was invalid or has expired';
      default:
        return 'An unknown error occurred';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Authentication Error
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {getErrorMessage(error)}
          </p>
        </div>
        <div className="mt-4 text-center">
          <Link 
            href="/auth/signin"
            className="text-indigo-600 hover:text-indigo-500"
          >
            Try signing in again
          </Link>
        </div>
      </div>
    </div>
  );
} 