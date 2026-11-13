import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

async function verifySignedToken(token: string): Promise<boolean> {
  try {
    const secret = process.env.ADMIN_JWT_SECRET || process.env.SESSION_SECRET;
    if (!secret) return false;

    const [headerB64, bodyB64, signatureB64] = token.split('.');
    if (!headerB64 || !bodyB64 || !signatureB64) return false;

    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const data = encoder.encode(`${headerB64}.${bodyB64}`);
    const sig = Uint8Array.from(atob(signatureB64.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0));

    const valid = await crypto.subtle.verify('HMAC', key, sig, data);
    if (!valid) return false;

    const payload = JSON.parse(atob(bodyB64.replace(/-/g, '+').replace(/_/g, '/')));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return false;

    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // --- Security Headers ---
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');

  // Canonical redirect: enforce a single version for SEO (`https://shankygroup.com`).
  const canonicalHost = 'shankygroup.com';
  const host = request.headers.get('host') || request.nextUrl.host;
  const forwardedProto = request.headers.get('x-forwarded-proto');
  const isHttps = forwardedProto ? forwardedProto === 'https' : request.nextUrl.protocol === 'https:';

  const isShankyHost =
    host === canonicalHost || host === `www.${canonicalHost}` || host?.startsWith(`${canonicalHost}:`);

  if (process.env.NODE_ENV === 'production' && isShankyHost && (host !== canonicalHost || !isHttps)) {
    const url = request.nextUrl.clone();
    url.protocol = 'https:';
    url.host = canonicalHost;
    return NextResponse.redirect(url);
  }

  const { pathname } = request.nextUrl;
  
  // Protect all /admin routes
  if (pathname.startsWith('/admin')) {
    if (pathname.startsWith('/admin/login') || pathname.startsWith('/admin/api/auth')) {
      return response;
    }
    
    const token = request.cookies.get('admin_token')?.value;
    
    if (!token || !(await verifySignedToken(token))) {
      if (pathname.startsWith('/admin/api')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
