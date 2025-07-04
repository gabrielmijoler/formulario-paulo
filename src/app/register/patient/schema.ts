import { z } from 'zod'
import { schemaCEP } from './components/Cep/schema'

export const clientSchema = z.object({
  id: z.number().int(),
  name: z.string().nonempty('Campo obrigatório'),
  email: z.string().email('Email inválido'),
  document: z
    .string()
    .nonempty('Campo obrigatório')
    .refine((value) => {
      const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
      return cpfRegex.test(value)
    }, 'CPF inválido'),
  ieRg: z
    .string()
    .nonempty('Campo obrigatório')
    .refine((value) => {
      const rgRegex = /^\d{2}\.\d{3}\.\d{3}-\d{1}$/
      return rgRegex.test(value)
    }, 'RG inválido'),
  telephone: z.string().nonempty('Campo obrigatório'),
  clientAddress: schemaCEP,
})
