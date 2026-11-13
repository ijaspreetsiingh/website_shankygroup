import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

function getSecret(): string {
  const secret = process.env.ADMIN_JWT_SECRET || process.env.SESSION_SECRET;
  if (!secret) throw new Error('Missing ADMIN_JWT_SECRET or SESSION_SECRET env var');
  return secret;
}

function createSignedToken(payload: Record<string, unknown>): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify({ ...payload, iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60 })).toString('base64url');
  const signature = crypto.createHmac('sha256', getSecret()).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${signature}`;
}

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    const validPassword = process.env.ADMIN_PASSWORD;
    if (!validPassword) {
      return NextResponse.json({ error: 'Admin password not configured' }, { status: 500 });
    }

    if (password !== validPassword) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const token = createSignedToken({ role: 'admin' });

    const cookieStore = await cookies();
    cookieStore.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_token');
  return NextResponse.json({ success: true });
}
