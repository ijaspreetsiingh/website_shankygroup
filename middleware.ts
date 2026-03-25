import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Canonical redirect: enforce a single version for SEO (`https://shankygroup.com`).
  const canonicalHost = 'shankygroup.com';
  const host = request.headers.get('host') || request.nextUrl.host;
  const forwardedProto = request.headers.get('x-forwarded-proto');
  const isHttps = forwardedProto ? forwardedProto === 'https' : request.nextUrl.protocol === 'https:';

  if (host !== canonicalHost || !isHttps) {
    const url = request.nextUrl.clone();
    url.protocol = 'https:';
    url.host = canonicalHost;
    // Keep pathname + query intact.
    return NextResponse.redirect(url);
  }

  const { pathname } = request.nextUrl;
  
  // Protect all /admin routes
  if (pathname.startsWith('/admin')) {
    // Exclude login page and auth API
    if (pathname.startsWith('/admin/login') || pathname.startsWith('/admin/api/auth')) {
      return NextResponse.next();
    }
    
    const token = request.cookies.get('admin_token')?.value;
    
    if (token !== 'authenticated') {
      // If it's an API request, return 401
      if (pathname.startsWith('/admin/api')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      // If it's a page request, redirect to login
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Run on most routes so robots/sitemap and all pages are canonicalized.
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
