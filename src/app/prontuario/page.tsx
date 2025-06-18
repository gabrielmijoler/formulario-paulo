'use client'

import { SubmitHandler, useForm } from 'react-hook-form'

import Layout from '@/components/template/Layout'
import { SelectChangeEvent } from '@mui/material'
import { useState } from 'react'
import { useAppData } from '@/context'
import {
  clientsToOptions,
  optionsToQuestion,
  pathologiesToOptions,
} from '@/utils/prontuarioMaps'
import { Formulario } from './componentes/formulario'
import { useProntuarioData } from '@/hook/useProntuarioData'

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

  const { clients, questions, pathologies } = useProntuarioData()
  const clientWatch = watch('client')
  const QuestionsWatch = watch('questions')

  const optionsQuestion = optionsToQuestion(questions)

  const optionsClient = clientsToOptions(clients)
  const optionsPathologies = pathologiesToOptions(pathologies)
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

  const handleModal = () => {
    setModalOpen(!modalOpen)
  }

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data)
  }

  return (
    <Layout titulo="Prontuário do Prontuario">
      <Formulario
        QuestionsWatch={QuestionsWatch}
        clientWatch={clientWatch}
        control={control}
        errors={errors}
        getValues={getValues}
        handleModal={handleModal}
        handleSubmit={handleSubmit}
        isContentSelected={isContentSelected}
        modalOpen={modalOpen}
        onChangeClient={onChangeClient}
        onSubmit={onSubmit}
        optionsClient={optionsClient}
        optionsPathologies={optionsPathologies}
        optionsQuestion={optionsQuestion}
        setValue={setValue}
        setModalOpen={setModalOpen}
        handleSelectChange={() => { }}
        handleClose={() => { }}
      />
    </Layout>
  )
}
