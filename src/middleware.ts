import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'
import cookieService from '@/services/CookiesService';

export async function middleware(req: NextRequest) {
  const hostname = req.headers.get('host')
  // console.log("Client Host:", hostname);

  if (!hostname) {
    return NextResponse.next(); // Proceed if no domain found
  }
 // Extract domain without port number
  const name = hostname.replace(/:\d+$/, '');
  const DOMAIN = { domain: name };
  // const DOMAIN = { domain: 'test-company.couponbase.local' };

  cookieService.getCookieStore();
  // Create a response object
  const response = NextResponse.next();
  response.headers.set('x-pathname', req.nextUrl.pathname);
  response.headers.set('x-url', req.url);
  // Set 'domain' cookie if not already set
  response.cookies.set('domain', JSON.stringify(DOMAIN), {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: '/',
      maxAge: 3600,
    });

  return response;
  return NextResponse.next(); // Proceed if no data fetched
}

// exclude 404 route

export const config = {
  matcher: '/((?!404).*)',
};
