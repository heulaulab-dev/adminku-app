import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './auth';

// Routes that require authentication
const PROTECTED_PREFIX = '/app';

// Extend NextRequest with auth property from NextAuth
type AuthenticatedRequest = NextRequest & {
  auth: { user?: unknown } | null;
};

export default auth(function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const authReq = req as AuthenticatedRequest;
  const isLoggedIn = !!authReq.auth?.user;
  const isProtectedRoute = pathname.startsWith(PROTECTED_PREFIX);

  // Unauthenticated users accessing protected routes → redirect to login
  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('callbackUrl', pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  // Authenticated users on login page → redirect to dashboard
  if (pathname === '/login' && isLoggedIn) {
    return NextResponse.redirect(new URL('/app', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/app/:path*', '/app', '/login'],
};
