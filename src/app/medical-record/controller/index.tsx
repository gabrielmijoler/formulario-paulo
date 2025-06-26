"use client"
import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { SelectChangeEvent } from '@mui/material'
import { IClient } from '@/services/clients/types'
import { IPathologiesResponse } from '@/services/pathologies/types'
import { IQuestion } from '@/services/questions/types'
import { IMedicalRecordResponse } from '@/services/medical-record/types'
import { useAppData } from '@/context'

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
      onSubmit(data)
    },
    [onSubmit],
  )

  return {
    control,
    errors,
    isContentSelected,
    modalOpen,
    clientWatch,
    questionsWatch,
    handleSubmit: handleSubmit(handleFormSubmit),
    setValue,
    getValues,
    handleClientChange,
    handlePathologyChange,
    handleModalToggle,
    setIsContentSelected,
  }
}
