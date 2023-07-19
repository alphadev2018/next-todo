import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has('user')

  if (request.nextUrl.pathname.includes('/login')) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  } else if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/', '/login', '/api/:path*'],
}