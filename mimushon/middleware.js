import { NextResponse } from 'next/server';

/*
  Protects all /admin routes at the edge.
  The login page and login API are exempt.
  All other /admin paths require a valid admin_session cookie.
*/
export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Let the login page and login POST through
  if (pathname === '/admin/login' || pathname.startsWith('/api/admin/login')) {
    return NextResponse.next();
  }

  const session   = request.cookies.get('admin_session')?.value;
  const envSecret = process.env.ADMIN_SECRET;

  if (!envSecret || session !== envSecret) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
