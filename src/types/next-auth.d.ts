import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'seller' | 'provider' | 'customer';
    _createdAt: string;
  }

  interface Session {
    user: User & {
      id: string;
      role: string;
      _createdAt: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: 'admin' | 'seller' | 'provider' | 'customer';
    _createdAt: string;
  }
} 