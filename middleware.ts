import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const subdomain = hostname.split('.')[0];

  await updateSession(request);
  
  if (request.nextUrl.pathname.startsWith('/_next') || 
      request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  if (hostname === 'localhost:3000') {
    return NextResponse.next();
  }

  return NextResponse.rewrite(new URL(`/${subdomain}`, request.url));
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};