import Layout from '@/components/template/Layout'
import { Text } from '@/components/Text'
import { TextInput } from '@/components/TextInput'
import { Box } from '@mui/material'
import {
  IPathologiesRequest,
  IPathologiesResponse,
} from '@/services/pathologies/types'
import { getPathologies, postPathologies } from '@/services/pathologies'

export async function addPatologiaAction(formData: FormData) {
  'use server'

  const { code, description } = Object.fromEntries(formData)

  const payload = JSON.stringify({ code, description })
  await postPathologies(payload as any)
}

export async function PatologiaAction(): Promise<IPathologiesResponse[]> {
  'use server'

  const response = await getPathologies({
    current_page: 1,
    paginate: false,
    per_page: 10,
  })

  return Array.isArray(response) ? response : [response]
}

export default async function Patologias() {
  const patologias = await PatologiaAction()

  return (
    <Layout titulo="Cadastro de Patologias">
      <form className="p-1 w-full" action={addPatologiaAction}>
        <Text fontSize="xl">Cadastro de patologias</Text>

        <TextInput width="1/2" type="text" placeholder="Digite o código" />

        <TextInput width="1/2" placeholder="Digite a descrição" />
        <button
          className="px-4 py-3 rounded-lg bg-gray-200 mt-4
        border-2 focus:border-blue-500 focus:bg-white
        focus:outline-none text-black w-20"
          type="submit"
        >
          Enviar
        </button>
      </form>
      <Box>
        <Text as="h1">Patologias</Text>

        <ul>
          {patologias.map((params: IPathologiesRequest, index: number) => (
            <li key={index}>
              <span>{params.code}</span>
              <span>{params.description}</span>
            </li>
          ))}
        </ul>
      </Box>
    </Layout>
  )
}
