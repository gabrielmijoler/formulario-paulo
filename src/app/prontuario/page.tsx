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
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material'
import { SelectInput } from '@/components/Select'

export default function Prontuario() {
  const {
    handleSubmit,
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
        name: '',
        document: '',
        address: '',
        ieRg: '',
        email: '',
        telephone: 0,
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
  // const loadOptions = async (inputValue: string) => {
  //   const response: IPathologiesResponse[] = await getPathologies({
  //     filter: inputValue,
  //     paginate: true,
  //     per_page: 10,
  //     current_page: 1,
  //   })
  //   return response.map((item) => ({
  //     value: item.code,
  //     label: item.description,
  //   }))
  // }
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

  const clients: IClient[] = results[0].data ? results[0].data : []

  const questions: IQuestionResponse[] = Array.isArray(results[1].data)
    ? results[1].data
    : []

  const pathologies: IPathologiesResponse[] = Array.isArray(results[2].data)
    ? results[2].data
    : []

  const optionsQuestion = questions.map((item) => ({
    id: item.id,
    value: item.name,
    label: item.response,
  }))

  const optionsClient =
    clients.map((item, index) => ({
      id: index,
      value: item.ieRg,
      label: item.ieRg,
    })) || []

  const optionsPathologies =
    pathologies.map((item, index) => ({
      id: index,
      value: item.code,
      label: item.description,
    })) || []

  const onSubmit: SubmitHandler<any> = (data) => console.log(data)

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
              isMulti
              className="w-full"
              options={optionsPathologies}
              placeholder="Selecione as patologias"
              value={optionsPathologies.filter(() => field.value.ieRg)}
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
            render={({ field }) => (
              <>
                <Select
                  {...field}
                  multiple
                  value={field.value}
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  onChange={field.onChange}
                  renderValue={(selected) =>
                    selected
                      .map(
                        (id) =>
                          optionsQuestion.find((option) => option.id === id)
                            ?.label,
                      )
                      .join(', ')
                  }
                >
                  {optionsQuestion.map((option, index) => (
                    <MenuItem key={index} value={option.id}>
                      <Checkbox
                        checked={(field.value as number[]).includes(option.id)}
                      />
                      <ListItemText
                        primary={option.value}
                        secondary={option.label}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </>
            )}
          />
        </FormControl>
        {errors.medicalRecordQuestions && <span>Campo obrigatório</span>}
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
      </Box>
      {/* <SelectInput
        options={colorOptions}
        onChange={() => console}
      ></SelectInput> */}
    </Layout>
  )
}
