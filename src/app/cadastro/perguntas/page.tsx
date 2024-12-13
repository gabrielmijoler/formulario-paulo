import Layout from '@/components/template/Layout'
import { Text } from '@/components/Text'
import { TextInput } from '@/components/TextInput'
import { Toast } from '@/components/Toast'
import { revalidatePath } from 'next/cache'
import { getCookie } from '@/app/actions'
import { Box } from '@mui/material'
import { getQuestion, postQuestion } from '@/services/questions'
import { IQuestionResponse } from '@/services/questions/types'

export async function postQuestionAction(formData: FormData) {
  'use server'
  const auth = await getCookie('authToken')
  const { name } = Object.fromEntries(formData)

  const response = await fetch(`${process.env.CLINICAL_BASE_URL}questions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth}`,
    },
    body: JSON.stringify({ name }),
  })

  if (response.ok) {
    Toast({ message: 'Pergunta adicionada com sucesso!', type: 'success' })
    revalidatePath('/')
  } else {
    Toast({
      message: 'Ocorreu um erro tentar adicionar pergunta',
      type: 'error',
    })
  }
}
export async function addQuestionAction(formData: FormData) {
  'use server'

  const { name } = Object.fromEntries(formData)

  const payload = JSON.stringify({ name })
  await postQuestion(payload as any)
}

export async function PatientAction(): Promise<IQuestionResponse[]> {
  'use server'

  const response = await getQuestion()

  return Array.isArray(response) ? response : [response]
}

export default async function Perguntas() {
  const questions = await PatientAction()

  return (
    <Layout titulo="Cadastro de Perguntas">
      <form className="p-1 w-full" action={addQuestionAction}>
        <Text fontSize="xl">Cadastro de perguntas</Text>
        <TextInput
          width="1/2"
          type="text"
          name="name"
          placeholder="Digite a pergunta"
        />

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
        <Text as="h1">Perguntas</Text>
        <ul>
          {questions.map((params: any) => (
            <li key={params.id}>
              <span>{params.name}</span>
            </li>
          ))}
        </ul>
      </Box>
    </Layout>
  )
}
