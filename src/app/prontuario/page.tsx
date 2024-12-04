'use client'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { Box } from '@/components/Box'
import { SelectInput } from '@/components/Select'
import { colorOptions } from '@/components/Select/mock'
import Layout from '@/components/template/Layout'
import { Text } from '@/components/Text'
import { TextAreaInput } from '@/components/TextInputArea'

type RecordsProps = {
  name: string
  address: string
  email: string
  cpf: string
  rg: string
  dateBourn: string
  obsAboutPatient: string
}

export default function Prontuario() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    criteriaMode: 'all',
    defaultValues: {
      name: '',
      address: '',
      email: '',
      cpf: '',
      rg: '',
      dateBourn: '',
      obsAboutPatient: '',
    },
  })

  const onSubmit: SubmitHandler<RecordsProps> = (data) => console.log(data)

  return (
    <Layout titulo="Prontuário do Paciente">
      <Box as="form" className="p-1" onSubmit={handleSubmit(onSubmit)}>
        <Text fontSize="xl">Prontuario</Text>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextAreaInput
              {...field}
              type="text"
              label="Nome"
              value={field.value}
              onChangeValue={field.onChange}
              placeholder="Digite o nome"
            />
          )}
        />
        {errors.name && <span>Campo obrigatório</span>}
        <Controller
          name="cpf"
          control={control}
          render={({ field }) => (
            <TextAreaInput
              {...field}
              label="CPF"
              value={field.value}
              onChangeValue={field.onChange}
              placeholder="Digite o seu CPF"
            />
          )}
        />
        {errors.cpf && <span>Campo obrigatório</span>}
      </Box>
      <SelectInput
        options={colorOptions}
        label="Patologia"
        onChange={() => console}
      ></SelectInput>
    </Layout>
  )
}
