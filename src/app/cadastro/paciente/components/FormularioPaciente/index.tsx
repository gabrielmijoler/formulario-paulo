'use client'

import { TextInput } from '@/components/TextInput'
import { maskCPF, maskRG } from '@/helpers/maskCep'
import { Text } from '@/components/Text'
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { clientSchema } from '../../schema'
import { addPatientAction } from '@/useServer/addPatientAction'
import { Box } from '@/components/Box'

export default function FormularioPaciente() {
  const methods = useForm({
    criteriaMode: 'all',
    resolver: zodResolver(clientSchema),
    defaultValues: {
      // address: {
      //   street: '',
      //   number: '',
      //   zipCode: '',
      //   neighborhood: '',
      //   city: '',
      //   UF: '',
      //   complement: '',
      // },
      name: '',
      email: '',
      address: '',
      document: '',
      ieRg: '',
      telephone: '',
      // obsAboutPatient: '',
      // files: [],
    },
  })

  const onSubmit: SubmitHandler<any> = (data) => {
    addPatientAction(data)
  }

  return (
    <FormProvider {...methods}>
      <form className="p-1" action={addPatientAction}>
        <Text fontSize="xl">Cadastro de paciente</Text>
        <Controller
          name="name"
          control={methods.control}
          render={({ field }) => (
            <TextInput
              {...field}
              width="full"
              name="name"
              type="text"
              value={field.value}
              onChange={field.onChange}
              placeholder="Digite o nome"
            />
          )}
        />
        {methods.formState.errors.name && (
          <Text color="red-500">{methods.formState.errors.name.message}</Text>
        )}
        <Controller
          name="document"
          control={methods.control}
          render={({ field }) => (
            <TextInput
              {...field}
              width="full"
              name="document"
              value={maskCPF(field.value)}
              onChange={(e) => field.onChange(maskCPF(e.target.value))}
              placeholder="Digite o seu CPF"
            />
          )}
        />
        {methods.formState.errors.document && (
          <Text color="red-500">
            {methods.formState.errors.document.message}
          </Text>
        )}
        <Controller
          name="ieRg"
          control={methods.control}
          render={({ field }) => (
            <TextInput
              {...field}
              width="full"
              name="ieRg"
              value={maskRG(field.value)}
              onChange={(e) => field.onChange(maskRG(e.target.value))}
              placeholder="Digite o seu RG"
            />
          )}
        />
        {methods.formState.errors.ieRg && (
          <Text color="red-500">{methods.formState.errors.ieRg.message}</Text>
        )}
        {/* <Cep /> */}
        <Controller
          name="email"
          control={methods.control}
          rules={{
            required: 'Campo obrigatório',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Email inválido',
            },
          }}
          render={({ field }) => (
            <TextInput
              {...field}
              name="email"
              value={field.value}
              onChange={field.onChange}
              placeholder="Digite o Email"
            />
          )}
        />
        {methods.formState.errors.email && (
          <Text color="red-500">{methods.formState.errors.email.message}</Text>
        )}
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
        {/* {methods.formState.errors.files && <Text>Campo obrigatório</Text>} */}
        <TextInput type="submit" />
      </form>
    </FormProvider>
  )
}
