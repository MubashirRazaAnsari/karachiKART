import NextAuth from 'next-auth';
import { authOptions } from '../authOptions';

const handler = NextAuth(authOptions);

// Export as named functions for better HTTP method handling
export const GET = handler;
export const POST = handler;