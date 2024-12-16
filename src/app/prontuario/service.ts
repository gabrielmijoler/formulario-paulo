'use server'
import { postMedicalRecord } from '@/services/medical-record'

export async function addMedicalAction(state: any, formData: FormData) {
  const { code, description } = Object.fromEntries(formData)

  const payload = JSON.stringify({ code, description })
  await postMedicalRecord(payload as any)
  return  state.succes = 'Prontuario criado com sucesso!' 
}
