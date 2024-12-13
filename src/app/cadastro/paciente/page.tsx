import { Box } from '@/components/Box'
import Layout from '@/components/template/Layout'
import { Text } from '@/components/Text'
import { TextInput } from '@/components/TextInput'

import { getPathologies, postPathologies } from '@/services/pathologies'
import { IPathologiesResponse } from '@/services/pathologies/types'

export async function addPatientAction(formData: FormData) {
  'use server'

  const { email, name, document, ieRg, telephone } =
    Object.fromEntries(formData)

  const payload = JSON.stringify({ email, name, document, ieRg, telephone })
  await postPathologies(payload as any)
}

export async function getPatientAction(): Promise<IPathologiesResponse[]> {
  'use server'

  const response = await getPathologies({
    current_page: 1,
    paginate: false,
    per_page: 10,
  })

  return Array.isArray(response) ? response : [response]
}

export default async function Paciente() {
  const pacients = await getPatientAction()

  return (
    <Layout titulo="Cadastro de Paciente" className="font-bold">
      <form className="p-1" action={addPatientAction}>
        <Text fontSize="xl">Cadastro de paciente</Text>

        <TextInput
          name="name"
          width="full"
          type="text"
          placeholder="Digite o nome"
        />

        {/* {methods.formState.errors.name && (
          <Text color="red-500">{methods.formState.errors.name.message}</Text>
        )} */}
        <TextInput
          width="full"
          name="document"
          placeholder="Digite o seu CPF"
        />
        {/* {methods.formState.errors.document && (
          <Text color="red-500">
            {methods.formState.errors.document.message}
          </Text>
        )} */}

        <TextInput width="full" name="ieRg" placeholder="Digite o seu RG" />
        {/* {methods.formState.errors.ieRg && (
          <Text color="red-500">{methods.formState.errors.ieRg.message}</Text>
        )} */}
        {/* <Cep /> */}
        <TextInput name="email" placeholder="Digite o Email" />
        <TextInput name="telephone" placeholder="Digite o Telefone" />
        {/* {methods.formState.errors.email && (
          <Text color="red-500">{methods.formState.errors.email.message}</Text>
        )} */}
        {/* <Controller
            name="obsAboutPatient"
            control={methods.control}
            render={({ field }) => (
              <TextAreaInput
                
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
      <Box>
        <Text className="mt-10" as="h1">
          Pacientes
        </Text>

        <ul className="mt-3">
          {pacients.map((params: any, index: number) => (
            <li key={index}>
              <span>{params.name}</span>
              <span>{params.telephone}</span>
            </li>
          ))}
        </ul>
      </Box>
    </Layout>
  )
}
