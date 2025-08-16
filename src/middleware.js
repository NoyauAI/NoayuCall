import { NextResponse } from 'next/server';

export function middleware(request) {
  const sessionToken = request.cookies.get('connect')?.value;
  const requestHeaders = new Headers(request.headers);

  if (sessionToken) {
    requestHeaders.set('x-session-token', sessionToken);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: '/:path*',
};