import { NextResponse } from 'next/server'
import { getCookie } from './app/actions'
import { RoutesUrls } from './routes'

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
    RoutesUrls.HOME,
    RoutesUrls.DASHBOARD_URL,
    RoutesUrls.PROFILE_URL,
    RoutesUrls.MEDICAL_RECORD_URL,
    RoutesUrls.PATHOLIES_URL,
    RoutesUrls.QUESTION_URL,
    RoutesUrls.PATIENT_URL,
  ],
}
