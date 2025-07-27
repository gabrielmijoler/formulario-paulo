"use client"
import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { SelectChangeEvent } from '@mui/material'
import { IClient } from '@/services/clients/types'
import { IPathologiesResponse } from '@/services/pathologies/types'
import { IQuestion, IQuestionResponse } from '@/services/questions/types'
import { IMedicalRecordResponse } from '@/services/medical-record/types'
import { useAppData } from '@/context'
import { postQuestion } from '@/services/questions'
import { useMutation } from '@tanstack/react-query'

interface UseMedicalRecordControllerProps {
  clients: IClient[]
  pathologies: IPathologiesResponse[]
  questions: IQuestion[]
  onSubmit: (data: IMedicalRecordResponse) => void
}

export const useMedicalRecordController = ({
  clients,
  pathologies,
  questions,
  onSubmit,
}: UseMedicalRecordControllerProps) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [isContentSelected, setIsContentSelected] = useState(false)
  const [questionData, setQuestionData] = useState<IQuestionResponse[]>([])
  const { user } = useAppData()
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
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
        clientAddress: {
          zipCode: '',
          street: '',
          number: '',
          complement: '',
          neighborhood: '',
          city: '',
          state: '',
        },
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
  const questionsWatch = watch('questions')

  const handleClientChange = useCallback(
    (event: SelectChangeEvent) => {
      const selectedClient = clients.find(
        (client) => client.id === Number(event.target.value),
      )

      if (selectedClient) {
        setValue('client', selectedClient)
        setIsContentSelected(true)
      }
    },
    [clients, setValue],
  )

  const handlePathologyChange = useCallback(
    (event: SelectChangeEvent) => {
      const selectedPathology = pathologies.find(
        (pathology) => pathology.id === event.target.value,
      )

      if (selectedPathology) {
        setValue('pathologies', [selectedPathology])
      }
    },
    [pathologies, setValue],
  )

  const handleModalToggle = useCallback(() => {
    setModalOpen((prev) => !prev)
  }, [])

  const handleFormSubmit = useCallback(
    (data: any) => {
      const selectedPathologies = Array.isArray(data.pathologies)
        ? data.pathologies.map((id: string | number) => {
          const found = pathologies.find((p) => p.id === id)
          return found
            ? { id: found.id, name: found.code, response: found.description }
            : null
        }).filter(Boolean)
        : []

      const payload = {
        ...data,
        pathologies: selectedPathologies,
      }

      onSubmit(payload)
    },
    [onSubmit, pathologies],
  )

  const handleSave = (questionsWithResponses: IQuestionResponse[]) => {
    setQuestionData(questionsWithResponses)
  }

  console.log('clients', clients)
  console.log('clientWatch', clientWatch)

  return {
    control,
    errors,
    isContentSelected,
    modalOpen,
    clientWatch,
    questionsWatch,
    questionData,
    handleSubmit: handleSubmit(handleFormSubmit),
    setValue,
    getValues,
    handleClientChange,
    handlePathologyChange,
    handleModalToggle,
    handleSave,
    setIsContentSelected,
  }
}
