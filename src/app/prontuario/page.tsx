import Layout from '@/components/template/Layout'
import { Text } from '@/components/Text'
import { TextAreaInput } from '@/components/TextInputArea'

import { PatientAction } from '../cadastro/perguntas/page'
import NewForm from './componentes/NewForm'

export default async function Prontuario() {
  const questions = await PatientAction()

  return (
    <Layout titulo="Prontuário do Prontuario">
      <Text fontSize="xl">Prontuario</Text>
      <select
        className="w-full text-black p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        name="question"
      >
        {questions.map((option) => (
          <option key={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
      <NewForm >

        <TextAreaInput
          type="text"
          name="conclusion"
          placeholder="Digite a conclusão"
        />

        <TextAreaInput
          type="text"
          name="name"
          placeholder="Digite a conclusão"
        />

        <TextAreaInput
          type="text"
          name="infusion"
          placeholder="Digite o nome"
        />

        <TextAreaInput
          type="text"
          name="symptoms"
          placeholder="Digite o seu conclusion"
        />
      </NewForm>
    </Layout>
  )
}
