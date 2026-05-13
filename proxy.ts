import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './auth';

const publicRoutes = ['/', '/login', '/kebijakan'];

export default auth(function middleware(req: NextRequest & { auth: { user?: unknown } | null }) {
  const isLoggedIn = !!(req as { auth: { user?: unknown } | null }).auth?.user;
  const isAppRoute = req.nextUrl.pathname.startsWith('/app');
  const isPublicRoute = publicRoutes.some((route) => req.nextUrl.pathname === route);

  // If trying to access /app without auth, redirect to login
  if (isAppRoute && !isLoggedIn) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If logged in and on login page, redirect to dashboard
  if (req.nextUrl.pathname === '/login' && isLoggedIn) {
    return NextResponse.redirect(new URL('/app', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/app/:path*', '/app', '/login'],
};
