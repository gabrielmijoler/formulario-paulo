'use client'

import { useMutation } from '@tanstack/react-query'
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form'

import { Box } from '@/components/Box'
import Layout from '@/components/template/Layout'
import { Text } from '@/components/Text'
import { TextInput } from '@/components/TextInput'

import { IClient } from '@/services/clients/types'
import { postClient } from '@/services/clients'
import { Toast } from '@/components/Toast'

export default function Paciente() {
  const methods = useForm({
    criteriaMode: 'all',
    defaultValues: {
      name: '',
      // address: {
      //   street: '',
      //   number: '',
      //   zipCode: '',
      //   neighborhood: '',
      //   city: '',
      //   UF: '',
      //   complement: '',
      // },
      email: '',
      address: '',
      document: '',
      ieRg: '',
      telephone: '',
      // obsAboutPatient: '',
      // files: [],
    },
  })

  const { mutate, isSuccess } = useMutation({
    mutationFn: postClient,
  })

  const onSubmit: SubmitHandler<IClient> = (data) => {
    mutate({
      name: data.name,
      email: data.email,
      address: data.address,
      document: data.document,
      ieRg: data.ieRg,
      telephone: data.telephone,
    })
  }

  return (
    <Layout titulo="Cadastro de Paciente" className="font-bold">
      {isSuccess && (
        <Toast
          item={{ message: 'Paciente criada com sucesso!', type: 'success' }}
        />
      )}
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
