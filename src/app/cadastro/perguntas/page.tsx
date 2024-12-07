'use client'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import Layout from '@/components/template/Layout'
import { Text } from '@/components/Text'
import { TextInput } from '@/components/TextInput'
import { postQuestion } from '@/services/questions'
// import { Toast } from '@/components/Toast'
// import { useAppData } from '@/context'

type QuestionsProps = {
  name: string
  response: string
}

export default function Patologias() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    // getValues
  } = useForm({
    criteriaMode: 'all',
    defaultValues: {
      name: '',
      response: '',
    },
  })

  const onSubmit: SubmitHandler<QuestionsProps> = async (data) => {
    try {
      const responses = await postQuestion({
        name: data.name,
        response: data.response,
      })
      console.log(responses)
    } catch (error: any) {
      console.error(error)
    }
  }

  return (
    <Layout titulo="Cadastro de Patologias">
      <form className="p-1 w-full" onSubmit={handleSubmit(onSubmit)}>
        {/* <Toast item={{ message: 'error', type: 'warning' }} /> */}
        <Text fontSize="xl">Cadastro de perguntas</Text>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              width="1/2"
              type="text"
              value={field.value}
              onChangeValue={field.onChange}
              placeholder="Digite a pergunta"
            />
          )}
        />
        {errors.name && <span>Campo obrigatório</span>}
        <Controller
          name="response"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              width="1/2"
              value={field.value}
              onChangeValue={field.onChange}
              placeholder="Digite a resposta"
            />
          )}
        />
        {errors.response && <span>Campo obrigatório</span>}
        <button
          className="px-4 py-3 rounded-lg bg-gray-200 mt-4
            border-2 focus:border-blue-500 focus:bg-white
            focus:outline-none text-black w-20"
          type="submit"
        >
          Enviar
        </button>
      </form>
    </Layout>
  )
}
