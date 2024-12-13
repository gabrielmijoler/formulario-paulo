'use server'
import { getCookie, removeCookie } from '@/app/actions'
import { redirect } from 'next/navigation'

export async function logoutAction() {
  await removeCookie('authToken')
  const user = await getCookie('authToken')
  if (!user) {
    redirect('/')
  }
}
