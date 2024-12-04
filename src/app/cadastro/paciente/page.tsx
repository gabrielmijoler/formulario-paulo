'use client'

import { Controller, FormProvider, useForm } from 'react-hook-form'

import { Box } from '@/components/Box'
import Layout from '@/components/template/Layout'
import { Text } from '@/components/Text'
import { TextInput } from '@/components/TextInput'

type PatientInputs = {
  name: string
  address: {
    street: string,
    number: string,
    zipCode: string,
    neighborhood: string,
    city: string,
    UF: string,
    complement: string
  }
  email: string
  document: string
  ieRg: string
  telephone: string
  // files: File[]
  // obsAboutPatient: string
}

export default function Paciente() {
  const methods = useForm<PatientInputs>({
    criteriaMode: 'all',
    defaultValues: {
      name: '',
      address: {
        street: '',
        number: '',
        zipCode: '',
        neighborhood: '',
        city: '',
        UF: '',
        complement: ''
      },
      email: '',
      document: '',
      ieRg: '',
      telephone: '',
      // obsAboutPatient: '',
      // files: [],
    },
  })

  const onSubmit = (data: PatientInputs) => console.log(data)
  // const query = useQuery({ queryKey: ['patiente'], queryFn:  })
  return (
    <Layout titulo="Cadastro de Paciente">
      <FormProvider {...methods}>
        <Box
          as="form"
          className="p-1"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Text fontSize="xl">Cadastro de paciente</Text>
          <Controller
            name="name"
            control={methods.control}
            render={({ field }) => (
              <TextInput
                {...field}
                width="full"
                type="text"
                label="Nome"
                value={field.value}
                onChangeValue={field.onChange}
                placeholder="Digite o nome"
              />
            )}
          />
          {methods.formState.errors.name && <span>Campo obrigatório</span>}
          <Controller
            name="document"
            control={methods.control}
            render={({ field }) => (
              <TextInput
                {...field}
                width="full"
                label="CPF"
                value={field.value}
                onChangeValue={field.onChange}
                placeholder="Digite o seu CPF"
              />
            )}
          />
          {methods.formState.errors.document && <span>Campo obrigatório</span>}
          <Controller
            name="ieRg"
            control={methods.control}
            render={({ field }) => (
              <TextInput
                {...field}
                width="full"
                label="RG ou IE"
                value={field.value}
                onChangeValue={field.onChange}
                placeholder="Digite o seu RG"
              />
            )}
          />
          {methods.formState.errors.ieRg && <span>Campo obrigatório</span>}
          {/* <Cep /> */}
          <Controller
            name="email"
            control={methods.control}
            render={({ field }) => (
              <TextInput
                {...field}
                label="Email"
                value={field.value}
                onChangeValue={field.onChange}
                placeholder="Digite o Email"
              />
            )}
          />
          {/* <Controller
            name="obsAboutPatient"
            control={methods.control}
            render={({ field }) => (
              <TextAreaInput
                {...field}
                label="Observações sobre o paciente"
                value={field.value}
                onChangeValue={field.onChange}
                placeholder="Digite as observações sobre o paciente"
              />
            )}
          /> */}
          {/* <FileInput /> */}
          {/* {methods.formState.errors.files && <span>Campo obrigatório</span>} */}
          <TextInput type="submit" />
        </Box>
      </FormProvider>
    </Layout>
  )
}
