import { NextResponse } from 'next/server'

export function middleware(request: any) {
  const token = request.cookies.get('authToken') || null

  const protectedRoutes = config.matcher
  if (protectedRoutes.includes(request.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['dashboard', 'perfil', 'prontuario', '/cadastro/perguntas'],
}
