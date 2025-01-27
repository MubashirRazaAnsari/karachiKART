import NextAuth from 'next-auth';
import { authOptions } from '../authOptions';

// Simple and clean handler using the complete authOptions
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 