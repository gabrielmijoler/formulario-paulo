'use server'
import { postPathologies } from '@/services/pathologies'

export async function addPatientAction(formData: FormData) {
  const { email, name, document, ieRg, telephone } =
    Object.fromEntries(formData)

  const payload = JSON.stringify({ email, name, document, ieRg, telephone })
  await postPathologies(payload as any)
}
