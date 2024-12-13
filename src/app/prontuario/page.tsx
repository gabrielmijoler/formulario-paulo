'use client'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { Box } from '@/components/Box'
import { ColourOption } from '@/components/Select/mock'
import Layout from '@/components/template/Layout'
import { Text } from '@/components/Text'
import { TextAreaInput } from '@/components/TextInputArea'
import { IMedicalRecordRequest } from '@/services/medical-record/types'
import { useQueries } from '@tanstack/react-query'
import { getClient } from '@/services/clients'
import { getQuestion } from '@/services/questions'
import { IQuestionResponse } from '@/services/questions/types'
import { getPathologies } from '@/services/pathologies'
import { IPathologiesResponse } from '@/services/pathologies/types'
import { IClient } from '@/services/clients/types'
import {
  Checkbox,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
} from '@mui/material'
import { SelectInput } from '@/components/Select'
import { postMedicalRecord } from '@/services/medical-record'
import { PatientAction } from '../cadastro/perguntas/page'
import { useState } from 'react'

// export async function addPatologiaAction(formData: FormData) {
//   'use server'

//   const { code, description } = Object.fromEntries(formData)

//   const payload = JSON.stringify({ code, description })
//   await postMedicalRecord(payload as any)
// }

export default async function Prontuario() {
  useState()
  const questions = await PatientAction()
  return (
    <Layout titulo="Prontuário do Prontuario">
      <form className="p-1">
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
      </form>
    </Layout>
  )
}
