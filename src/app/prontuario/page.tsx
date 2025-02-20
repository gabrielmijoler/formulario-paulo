'use client'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'

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
  Select,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material'
import { SelectInput } from '@/components/Select'
import { useState } from 'react'
import { ModalQuestion } from './componentes/ModalQuestion'
import { useAppData } from '@/context'

export default function Prontuario() {
  const [isContentSelected, setIsContentSelected] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const { user } = useAppData()
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
      userId: user.id,
      status: user.status,
      client: {
        id: 0,
        name: '',
        document: '',
        address: '',
        ieRg: '',
        email: '',
        telephone: '',
      },
      pathologies: [
        {
          id: '',
          code: '',
          description: '',
        },
      ],
      questions: [
        {
          id: 0,
          name: '',
          response: '',
        },
      ],

      treatments: [
        {
          description: '',
          medicalRecordId: 0,
        },
      ],
    },
  })

  const clientWatch = watch('client')
  const QuestionsWatch = watch('questions')
  const results = useQueries({
    queries: [
      {
        queryKey: ['getClient'],
        queryFn: () =>
          getClient({
            paginate: false,
            per_page: 10,
            current_page: 1,
            total: 0,
            filter: {},
          }),
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
          getPathologies({
            paginate: false,
            per_page: 10,
            current_page: 1,
            total: 0,
            filter: {},
          }),
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

  // const handleSelectChange = (event: SelectChangeEvent<number[]>) => {
  //   const selectedQuestions = optionsQuestion.filter((el) =>
  //     event.target.value.includes(el.id),
  //   )
  //   console.log('selectedQuestions', selectedQuestions)
  //   const currentValue = event.target.name as any
  //   console.log('currentValue', currentValue)
  //   setSelectedQuestions(currentValue)
  //   setValue(currentValue, selectedQuestions)
  // }

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

  const handleModal = () => {
    setModalOpen(!modalOpen)
  }

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data)
  }

  return (
    <Layout titulo="Prontuário do Prontuario">
      <form className="p-1" onSubmit={handleSubmit(onSubmit)}>
        <Text fontSize="xl">Prontuario</Text>
        <hr className="w-full border-black box-border mb-8" />
        <FormControl className="w-full">
          <InputLabel id="select-label-clients">Paciente</InputLabel>
          <Controller
            name="client"
            control={control}
            render={({ field }) => (
              <>
                <Select
                  {...field}
                  labelId="select-label-clients"
                  id="select-label-clients"
                  value={getValues(field.name).id as any}
                  label="Paciente"
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
        </FormControl>
        {errors.clientId && <span>Campo obrigatório</span>}

        {isContentSelected && (
          <div className="grid grid-cols-2 gap-4 text-black mt-4">
            <input
              name="client.name"
              type="text"
              value={clientWatch.name}
              disabled
              placeholder="Nome"
              className="p-2 rounded disabled:bg-gray-400"
            />
            <input
              type="text"
              value={clientWatch.document}
              disabled
              placeholder="Documento"
              className="p-2 rounded disabled:bg-gray-400"
            />
            <input
              type="text"
              value={clientWatch.address}
              disabled
              placeholder="Endereço"
              className="p-2 rounded disabled:bg-gray-400"
            />
            <input
              type="text"
              value={clientWatch.ieRg}
              disabled
              placeholder="IE/RG"
              className="p-2 rounded disabled:bg-gray-400"
            />
            <input
              type="text"
              value={clientWatch.email}
              disabled
              placeholder="E-mail"
              className="p-2 rounded disabled:bg-gray-400"
            />
            <input
              type="text"
              value={clientWatch.telephone}
              disabled
              placeholder="Telefone"
              className="p-2 rounded disabled:bg-gray-400"
            />
          </div>
        )}
        <Controller
          name="pathologies"
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
        {errors.pathologies && <span>Campo obrigatório</span>}
        <button
          onClick={handleModal}
          className="w-48 h-10 my-3 rounded-2xl bg-amber-500 text-black"
        >
          Adicionar perguntas
        </button>
        <ModalQuestion
          control={control}
          errors={errors}
          optionsQuestion={optionsQuestion}
          QuestionsWatch={QuestionsWatch}
          setValue={setValue}
          modalOpen={modalOpen}
          handleModal={handleModal}
        />
        <Controller
          name="symptoms"
          control={control}
          render={({ field }) => (
            <TextAreaInput
              {...field}
              value={field.value}
              onChange={field.onChange}
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
              onChange={field.onChange}
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
              onChange={field.onChange}
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
              onChange={field.onChange}
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
      </form>
    </Layout>
  )
}
