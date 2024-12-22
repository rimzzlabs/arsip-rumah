import { auth as middleware } from '@/modules/auth'

import { A, pipe, S } from '@mobily/ts-belt'
import { NextResponse } from 'next/server'

const PRIVATE_ROUTES = ['/dashboard', '/account', '/bills']
const AUTH_ROUTES = ['/auth/signin', '/auth/signup']

export default middleware(async (req) => {
  let session = req.auth?.user
  let url = req.nextUrl

  if (url.pathname === '/') return NextResponse.next()

  let isPrivateRoutes = pipe(PRIVATE_ROUTES, A.some(S.includes(url.pathname)))
  if (isPrivateRoutes && !session) {
    return NextResponse.redirect(new URL('/auth/signin', url), { status: 307 })
  }

  let isApiAuthRoute = pipe(url.pathname, S.includes('/api/auth'))
  if (isApiAuthRoute) {
    if (!session) return NextResponse.redirect(new URL('/auth/signin', url), { status: 307 })
    return NextResponse.next()
  }

  let isAuthRoutes = pipe(AUTH_ROUTES, A.includes(url.pathname))
  if (isAuthRoutes && session) {
    return NextResponse.redirect(new URL(PRIVATE_ROUTES[1], url), { status: 307 })
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
