import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { Role } from '@/types';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;
    const role = token?.role;

    // Allow auth routes
    if (path.startsWith('/api/auth') || path.startsWith('/auth')) {
      return NextResponse.next();
    }

    // Allow all users to access profile routes
    if (path.startsWith('/profile')) {
      return NextResponse.next();
    }

    // Admin can access everything
    if (role === 'admin') {
      return NextResponse.next();
    }

    // Provider routes protection
    if (path.startsWith('/provider')) {
      if (role === 'provider') {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL('/', req.url));
    }

    // Seller routes protection
    if (path.startsWith('/seller')) {
      if (role === 'seller') {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
);

export const config = {
  matcher: [
    '/profile/:path*',
    '/seller/:path*',
    '/provider/:path*',
    '/admin/:path*',
    '/api/auth/:path*',
    '/auth/signin',
    '/auth/error'
  ]
}; 