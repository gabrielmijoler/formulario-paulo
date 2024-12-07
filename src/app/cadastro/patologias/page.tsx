'use client'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Box } from '@/components/Box'
import Layout from '@/components/template/Layout'
import { Text } from '@/components/Text'
import { TextInput } from '@/components/TextInput'
import { useQuery } from '@tanstack/react-query'
import { postPathologies } from '@/services/pathologies'

type PathologiesProps = {
  code: string
  description: string
}

export default function Patologias() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    getValues
  } = useForm({
    criteriaMode: 'all',
    defaultValues: {
      code: '',
      description: '',
    },
  })

  const { data, isFetching, isError } = useQuery({
    queryKey: ['postQuestions'], queryFn: async () =>
      postPathologies({
        code: getValues('code'),
        description: getValues('description')
      }),
    enabled: false
  })

  const onSubmit: SubmitHandler<PathologiesProps> = (data) => {
    postPathologies({ code: data.code, description: data.description })
  }

  return (
    <Layout titulo="Cadastro de Patologias">
      <Box
        as="form"
        className="p-1"
        width="full"
        onSubmit={handleSubmit(onSubmit)}
      >
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
      </Box>
      <TextInput width="20" type="submit" />
    </Layout>
  )
}
