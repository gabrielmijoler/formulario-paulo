import { IClientAddress } from '@/services/clients/types'
import { z } from 'zod'

export const schemaCEP = z.object({
  zipCode: z.string().min(8, 'CEP inválido'),
  street: z.string().min(1, 'Por favor, informe uma rua válido'),
  number: z.string().min(1, 'Por favor, informe um número válido'),
  city: z.string().min(1, 'Por favor, informe uma cidade válido'),
  state: z.string().min(1, 'Por favor, informe um estado válido'),
  complement: z.string(),
  neighborhood: z.string().min(1, 'Por favor, informe um bairro válido'),
}) satisfies z.ZodType<IClientAddress>

export type CEPZod = z.infer<typeof schemaCEP>
