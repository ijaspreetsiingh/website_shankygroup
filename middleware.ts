import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
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
  matcher: ['/admin/:path*'],
};
