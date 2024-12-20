'use client'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { Box } from '@/components/Box'
import Layout from '@/components/template/Layout'
import { Text } from '@/components/Text'
import { TextAreaInput } from '@/components/TextInputArea'
import { useQueries } from '@tanstack/react-query'
import { getClient } from '@/services/clients'
import { getQuestion } from '@/services/questions'
import { IQuestionResponse } from '@/services/questions/types'
import { getPathologies } from '@/services/pathologies'
import { IPathologiesResponse } from '@/services/pathologies/types'
import { IGetClient } from '@/services/clients/types'
import {
  FormControl,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  InputLabel,
  SelectChangeEvent,
  TextField,
  Button,
} from '@mui/material'
import { SelectInput } from '@/components/Select'
import { useState } from 'react'

export default function Prontuario() {
  const [isContentSelected, setIsContentSelected] = useState(false)

  const {
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
    control,
  } = useForm({
    criteriaMode: 'all',
    defaultValues: {
      symptoms: '',
      clinicalExam: '',
      completeClinicalExam: '',
      conclusion: '',
      clientId: 0,
      userId: 0,
      status: '',
      client: {
        id: 0,
        name: '',
        document: '',
        address: '',
        ieRg: '',
        email: '',
        telephone: '',
      },
      medicalRecordPathologies: [],
      medicalRecordQuestions: [],
      treatments: [
        {
          description: '',
          medicalRecordId: 0,
        },
      ],
    },
  })

  const clientWatch = watch('client')
  const QuestionsWatch = watch('medicalRecordQuestions')
  console.log(QuestionsWatch)
  const results = useQueries({
    queries: [
      {
        queryKey: ['getClient'],
        queryFn: () =>
          getClient({ paginate: false, per_page: 10, current_page: 1 }),
        enabled: true,
        retry: 1,
      },
      {
        queryKey: ['getQuestions'],
        queryFn: () => getQuestion(),
        enabled: true,
        retry: 1,
      },
      {
        queryKey: ['getPathologies'],
        queryFn: () =>
          getPathologies({ paginate: false, per_page: 10, current_page: 1 }),
        enabled: true,
        retry: 1,
      },
    ],
  })

  const clients: IGetClient[] = results[0].data ? results[0].data : []

  const questions: IQuestionResponse[] = Array.isArray(results[1].data)
    ? results[1].data
    : []

  const pathologies: IPathologiesResponse[] = Array.isArray(results[2].data)
    ? results[2].data
    : []

  const optionsQuestion = questions.map((item) => ({
    id: item.id,
    value: item.name,
    label: item.name,
  }))

  const [selectedQuestions, setSelectedQuestions] = useState([])

  const handleSelectChange = (event: SelectChangeEvent) => {
    const selectedQuestions = optionsClient.filter((el) =>
      (event.target.value as unknown as number[]).includes(el.id),
    )

    const currentValue = event.target.name as any
    console.log(currentValue)
    setSelectedQuestions(currentValue)
    setValue(currentValue, selectedQuestions)
  }

  const onChangeClient = (event: SelectChangeEvent) => {
    const selectedClient = optionsClient.find(
      (el) => el.id === (event.target.value as unknown as number),
    )
    const currentValue = event.target.name as any
    setIsContentSelected(currentValue.length > 0)
    setValue(currentValue, selectedClient)
  }

  const optionsClient =
    clients.map((item) => ({
      id: item.id,
      name: item.name,
      document: item.document,
      address: item.address,
      ieRg: item.ieRg,
      email: item.email,
      telephone: item.telephone,
    })) || []

  const optionsPathologies =
    pathologies.map((item, index) => ({
      id: index,
      value: item.code,
      label: item.description,
    })) || []

  console.log(selectedQuestions)

  const onSubmit: SubmitHandler<any> = (data) => console.log(data)

  return (
    <Layout titulo="Prontuário do Prontuario">
      <Box className="p-1" onSubmit={handleSubmit(onSubmit)}>
        <Text fontSize="xl">Prontuario</Text>
        <Controller
          name="client"
          control={control}
          render={({ field }) => (
            <>
              <Select
                {...field}
                className="w-full bg-slate-200 my-3"
                value={getValues(field.name).id as any}
                label="Cliente"
                onChange={onChangeClient}
              >
                {optionsClient.map((option, index) => (
                  <MenuItem key={index} value={option.id}>
                    <ListItemText
                      primary={option.name}
                      secondary={option.email}
                    />
                  </MenuItem>
                ))}
              </Select>
            </>
          )}
        />
        {errors.clientId && <span>Campo obrigatório</span>}

        {isContentSelected && (
          <div className="grid grid-cols-2 gap-4 text-black">
            <input
              name="client.name"
              type="text"
              value={clientWatch.name}
              readOnly
              placeholder="Nome"
              className="border p-2 rounded bg-gray-100"
            />
            <input
              type="text"
              value={clientWatch.document}
              readOnly
              placeholder="Documento"
              className="border p-2 rounded bg-gray-100"
            />
            <input
              type="text"
              value={clientWatch.address}
              readOnly
              placeholder="Endereço"
              className="border p-2 rounded bg-gray-100"
            />
            <input
              type="text"
              value={clientWatch.ieRg}
              readOnly
              placeholder="IE/RG"
              className="border p-2 rounded bg-gray-100"
            />
            <input
              type="text"
              value={clientWatch.email}
              readOnly
              placeholder="E-mail"
              className="border p-2 rounded bg-gray-100"
            />
            <input
              type="text"
              value={clientWatch.telephone}
              readOnly
              placeholder="Telefone"
              className="border p-2 rounded bg-gray-100"
            />
          </div>
        )}
        <Controller
          name="medicalRecordPathologies"
          control={control}
          render={({ field }) => (
            <SelectInput
              {...field}
              isMulti
              className="w-full bg-slate-200"
              options={optionsPathologies}
              placeholder="Selecione as patologias"
              value={optionsPathologies.filter(() => field.value)}
              getOptionValue={(option) => option.id.toString()}
              getOptionLabel={(option) => option.label}
              onChange={(selected) =>
                field.onChange(
                  selected.map((option: { value: any }) => option.value),
                )
              }
            />
          )}
        />
        {errors.medicalRecordPathologies && <span>Campo obrigatório</span>}
        <FormControl className="w-full !mt-4 ">
          <Controller
            name="medicalRecordQuestions"
            control={control}
            render={({ field }) => {
              console.log(field.value.map((item) => item))
              return (
                <SelectInput
                  {...field}
                  isMulti
                  className="w-full bg-slate-200"
                  options={optionsQuestion}
                  placeholder="Selecione as questões"
                  value={getValues('medicalRecordQuestions')}
                  onChange={handleSelectChange}
                />
              )
            }}
          />
        </FormControl>
        {errors.medicalRecordQuestions && <span>Campo obrigatório</span>}
        {selectedQuestions.length > 0 && (
          <>
            <div className="mt-4">
              {selectedQuestions.map((question, index) => (
                <div key={index} className="mb-4">
                  <TextField
                    label="Pergunta"
                    variant="outlined"
                    fullWidth
                    value={question}
                    InputProps={{
                      readOnly: true,
                    }}
                    className="mb-2"
                  />
                  <TextField
                    label="Resposta"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Insira sua resposta aqui"
                  />
                </div>
              ))}
            </div>
          </>
        )}

        <Controller
          name="symptoms"
          control={control}
          render={({ field }) => (
            <TextAreaInput
              {...field}
              value={field.value}
              onChangeValue={field.onChange}
              placeholder="Digite a conclusão"
            />
          )}
        />
        {errors.symptoms && <span>Campo obrigatório</span>}
        <Controller
          name="clinicalExam"
          control={control}
          render={({ field }) => (
            <TextAreaInput
              {...field}
              value={field.value}
              onChangeValue={field.onChange}
              placeholder="Digite a conclusão"
            />
          )}
        />
        {errors.clinicalExam && <span>Campo obrigatório</span>}

        <Controller
          name="completeClinicalExam"
          control={control}
          render={({ field }) => (
            <TextAreaInput
              {...field}
              type="text"
              value={field.value}
              onChangeValue={field.onChange}
              placeholder="Digite o nome"
            />
          )}
        />
        {errors.completeClinicalExam && <span>Campo obrigatório</span>}
        <Controller
          name="conclusion"
          control={control}
          render={({ field }) => (
            <TextAreaInput
              {...field}
              value={field.value}
              onChangeValue={field.onChange}
              placeholder="Digite o seu conclusion"
            />
          )}
        />
        {errors.conclusion && <span>Campo obrigatório</span>}
        <button
          className="px-4 py-3 rounded-lg bg-gray-200 mt-4
        border-2 focus:border-blue-500 focus:bg-white
        focus:outline-none text-black w-full"
          type="submit"
        >
          Cadastrar Prontuario
        </button>
      </Box>
    </Layout>
  )
}
