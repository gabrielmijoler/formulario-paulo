import { Box } from '@/components/Box'
import Layout from '@/components/template/Layout'
import { Text } from '@/components/Text'

import FormularioPaciente from './components/FormularioPaciente'
import { getClient } from '@/services/clients'
import { IClient } from '@/services/clients/types'

export async function getPatientAction(): Promise<IClient[]> {
  'use server'

  const response = await getClient({
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
      <FormularioPaciente />
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
