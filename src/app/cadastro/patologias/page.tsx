'use client'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import Layout from '@/components/template/Layout'
import { Text } from '@/components/Text'
import { TextInput } from '@/components/TextInput'
import { useMutation, useQuery } from '@tanstack/react-query'
import { postPathologies } from '@/services/pathologies'
import { IPathologiesRequest } from '@/services/pathologies/types'
import { Toast } from '@/components/Toast'

export default function Patologias() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    criteriaMode: 'all',
    defaultValues: {
      code: '',
      description: '',
    },
  })

  const { mutate, isSuccess } = useMutation({
    mutationFn: postPathologies,
    onSuccess: () => {
      reset()
    },
  })

  const onSubmit: SubmitHandler<IPathologiesRequest> = (data) => {
    mutate({ code: data.code, description: data.description })
  }

  return (
    <Layout titulo="Cadastro de Patologias">
      {isSuccess && (
        <Toast
          item={{ message: 'Patologia criada com sucesso!', type: 'success' }}
        />
      )}
      <form className="p-1 w-full" onSubmit={handleSubmit(onSubmit)}>
        <Text fontSize="xl">Cadastro de patologias</Text>
        <Controller
          name="code"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              width="1/2"
              type="text"
              value={field.value}
              onChangeValue={field.onChange}
              placeholder="Digite o código"
            />
          )}
        />
        {errors.code && <span>Campo obrigatório</span>}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              width="1/2"
              value={field.value}
              onChangeValue={field.onChange}
              placeholder="Digite a descrição"
            />
          )}
        />
        {errors.description && <span>Campo obrigatório</span>}
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
