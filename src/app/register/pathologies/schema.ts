import { z } from 'zod'

export const patholiaSchema = z.object({
  code: z.string().nonempty('Campo obrigatório'),
  description: z.string().nonempty('Campo obrigatório'),
})
