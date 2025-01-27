import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { client } from '@/sanity/lib/client';
import { Role } from '@/types';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with service-provider role
    const result = await client.create({
      _type: 'user',
      name,
      email,
      password: hashedPassword,
      role: 'provider' as Role
    });

    return NextResponse.json({ message: 'Provider registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to register provider' },
      { status: 500 }
    );
  }
} 