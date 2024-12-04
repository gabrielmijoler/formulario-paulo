'use client'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Box } from '@/components/Box'
import Layout from '@/components/template/Layout'
import { Text } from '@/components/Text'
import { TextInput } from '@/components/TextInput'
import { useQuery } from '@tanstack/react-query'
import { QuestionsPost } from '@/contextApi/questions'

type PathologiesProps = {
  name: string
  response: string
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
      name: '',
      response: '',
    },
  })


  // const { data, isFetching, isError } = useQuery({
  //   queryKey: ['Questions'], queryFn: () => QuestionsPost({
  //     name: getValues('name'),
  //     response: getValues('response')
  //   }),
  //   enabled: false
  // })

  // useEffect(() => {
  // }, [])
  const onSubmit: SubmitHandler<PathologiesProps> = (data) => {
    QuestionsPost({ name: data.name, response: data.response })
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
          name="name"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              width="1/2"
              type="text"
              label="Codígo"
              value={field.value}
              onChangeValue={field.onChange}
              placeholder="Digite o código"
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
              label="Descrição"
              value={field.value}
              onChangeValue={field.onChange}
              placeholder="Digite a descrição"
            />
          )}
        />
        {errors.response && <span>Campo obrigatório</span>}
      </Box>
      <TextInput width="20" type="submit" />
    </Layout>
  )
}
