'use client'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { Box } from '@/components/Box'
import { SelectInput } from '@/components/Select'
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

export default function Prontuario() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IMedicalRecordRequest>({
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
        name: '',
        document: '',
        address: '',
        ieRg: '',
        email: '',
        telephone: 0,
      },
      medicalRecordPathologies: [
        {
          pathologiesId: 0,
        },
      ],
      medicalRecordQuestions: [
        {
          questionId: 0,
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

  const results = useQueries({
    queries: [
      {
        queryKey: ['getClient'],
        queryFn: () => getClient(),
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
        queryFn: () => getPathologies({ paginate: true, per_page: 20 }),
        enabled: true,
        retry: 1,
      },
    ],
  })

  const clients: IClient[] = results[0].data ? results[0].data : []

  const questions: IQuestionResponse[] = Array.isArray(results[1].data)
    ? results[1].data
    : []

  const pathologies: IPathologiesResponse[] = Array.isArray(results[2].data)
    ? results[2].data
    : []

  const options: ColourOption[] = questions.map((item) => ({
    id: item.id,
    value: item.name,
    label: item.name,
  }))

  const optionsClient: any = clients.map((item) => ({
    id: item.ieRg,
    value: item.name,
    label: item.name,
  }))

  const optionsPathologies: any = pathologies.map((item) => ({
    id: item.id,
    value: item.code,
    label: item.code,
  }))

  const onSubmit: SubmitHandler<IMedicalRecordRequest> = (data) =>
    console.log(data)

  return (
    <Layout titulo="Prontuário do Prontuario">
      <Box as="form" className="p-1" onSubmit={handleSubmit(onSubmit)}>
        <Text fontSize="xl">Prontuario</Text>
        <Controller
          name="clientId"
          control={control}
          render={({ field }) => (
            <SelectInput
              {...field}
              options={optionsClient}
              placeholder="Selecione o cliente"
              value={optionsClient.filter(
                (option: { id: number }) => option.id === field.value,
              )}
              getOptionValue={(option) => option.id.toString()}
            />
          )}
        />
        {errors.clientId && <span>Campo obrigatório</span>}
        <Controller
          name="client"
          control={control}
          render={({ field }) => (
            <SelectInput
              {...field}
              options={optionsPathologies}
              placeholder="Selecione o patologias"
              value={optionsPathologies.filter(() => field.value.ieRg)}
              getOptionValue={(option) => option.id.toString()}
            />
          )}
        />
        {errors.medicalRecordPathologies && <span>Campo obrigatório</span>}
        <Controller
          name="medicalRecordQuestions"
          control={control}
          render={({ field }) => (
            <SelectInput
              {...field}
              options={options}
              placeholder="Selecione a questão"
              isMulti
              value={options.filter((option) =>
                field.value.some((item) => item.questionId === option.id),
              )}
              getOptionValue={(option) => option.id.toString()}
            />
          )}
        />
        {errors.medicalRecordQuestions && <span>Campo obrigatório</span>}
        <Controller
          name="conclusion"
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
        {errors.conclusion && <span>Campo obrigatório</span>}
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
      </Box>
      {/* <SelectInput
        options={colorOptions}
        onChange={() => console}
      ></SelectInput> */}
    </Layout>
  )
}
