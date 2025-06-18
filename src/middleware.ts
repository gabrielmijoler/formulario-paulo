import { NextResponse } from 'next/server'
import { getCookie } from './app/actions'

export async function middleware(request: any) {
  // const auth = await getCookie('authToken')
  // const protectedRoutes = config.matcher
  // if (protectedRoutes.includes(request.nextUrl.pathname) && !auth?.token) {
  //   return NextResponse.redirect(new URL('/', request.url))
  // }
  // return NextResponse.next()
}

export const config = {
  matcher: [
    '/home',
    '/dashboard',
    '/perfil',
    '/prontuario',
    '/cadastro/perguntas',
  ],
}
