import { z } from 'zod'

export const questionSchema = z.object({
  name: z.string().nonempty('Campo obrigatório'),
  response: z.string().nonempty('Campo obrigatório'),
})
