import { NextResponse } from 'next/server';

export function proxy(request) {
  const { pathname } = request.nextUrl;

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/pl', request.url));
  }
}

export const config = {
  matcher: [
    '/',
  ],
};
