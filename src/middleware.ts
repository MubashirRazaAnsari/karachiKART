import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    authorized({ token, req }) {
      const path = req.nextUrl.pathname;
      
      // Public routes
      if (path === '/' || path.startsWith('/auth')) {
        return true;
      }

      // Protected routes
      if (!token) return false;

      if (path.startsWith('/admin')) return token.role === 'admin';
      if (path.startsWith('/seller')) return token.role === 'seller' || token.role === 'admin';
      if (path.startsWith('/provider')) return token.role === 'provider' || token.role === 'admin';
      if (path.startsWith('/profile')) return true;

      return true;
    },
  },
});

export const config = {
  matcher: [
    '/admin/:path*',
    '/seller/:path*',
    '/provider/:path*',
  ],
}; 