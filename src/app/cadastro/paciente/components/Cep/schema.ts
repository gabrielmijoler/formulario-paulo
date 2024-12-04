import { z } from 'zod'

export const schemaForm = z
  .object({
    address: z.object({
      zipCode: z.string().min(9, 'CEP inválido'),
      street: z.string().min(1, 'Por favor, informe uma rua válido'),
      number: z.string().min(1, 'Por favor, informe um número válido'),
      city: z.string().min(1, 'Por favor, informe uma cidade válido'),
      state: z.string().min(1, 'Por favor, informe um estado válido'),
      complement: z.string(),
      district: z.string().min(1, 'Por favor, informe um bairro válido'),
    }),
  })
  .transform((fields) => ({
    address: {
      zipCode: fields.address.zipCode,
      street: fields.address.street,
      number: fields.address.number,
      city: fields.address.city,
      state: fields.address.state,
      complement: fields.address.complement,
      district: fields.address.district,
    },
  }))

export type FormProps = z.infer<typeof schemaForm>
export type AddressProps = {
  address: {
    bairro: string
    complemento: string
    uf: string
    logradouro: string
    localidade: string
  }
}
