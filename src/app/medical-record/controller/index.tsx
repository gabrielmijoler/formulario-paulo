'use client'
import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { SelectChangeEvent } from '@mui/material'
import { IQuestionResponse } from '@/services/questions/types'
import { IMedicalRecordResponse } from '@/services/medical-record/types'
import { useAppData } from '@/context'
import { MedicalRecordFormView } from '../view'
import { useApiData } from '@/hook/use-api-data'
import { IClient } from '@/services/clients/types'
import { IPathologiesResponse } from '@/services/pathologies/types'

interface MedicalRecordFormData {
  client: IClient
  pathologies: IPathologiesResponse[]
  questions: IQuestionResponse[]
  symptoms: string
  clinicalExam: string
  conclusion: string
}

export const useMedicalRecordController = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [isContentSelected, setIsContentSelected] = useState(false)
  const [questionData, setQuestionData] = useState<IQuestionResponse[]>([])
  const { user } = useAppData()
  const { clients, pathologies, questions } = useApiData()
  const {
    control,
    handleSubmit: rhfHandleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<MedicalRecordFormData>({
    criteriaMode: 'all',
    defaultValues: {
      symptoms: '',
      clinicalExam: '',
      conclusion: '',
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
      pathologies: [],
      questions: [],
      symptoms: '',
      clinicalExam: '',
      conclusion: '',
    },
  })

  const clientWatch = watch('client')
  const questionsWatch = watch('questions')
  const pathologiesWatch = watch('pathologies')

  const handleClientChange = useCallback(
    (client: IClient | null) => {
      if (client) {
        setValue('client', client)
        setIsContentSelected(true)
      }
    },
    [setValue],
  )

  const handlePathologyChange = useCallback(
    (selectedPathologies: IPathologiesResponse[]) => {
      return setValue('pathologies', selectedPathologies)
    },
    [setValue],
  )

  const handleModalToggle = useCallback(() => {
    setModalOpen((prev) => !prev)
  }, [])

  const handleFormSubmit = useCallback((data: any) => {
    try {
      console.log('Dados do formulário:', data)
      // Aqui você deve chamar a mutation para salvar
    } catch (error) {
      console.error('Erro ao enviar formulário:', error)
    }
  }, [])

  const handleSave = useCallback(
    (questionsWithResponses: IQuestionResponse[]) => {
      setQuestionData(questionsWithResponses)
    },
    [],
  )

  return {
    clients,
    pathologies,
    questions,
    control,
    errors,
    isContentSelected,
    modalOpen,
    clientWatch,
    questionsWatch,
    questionData,
    handleSubmit: rhfHandleSubmit(handleFormSubmit),
    setValue,
    getValues,
    handleClientChange,
    handlePathologyChange,
    handleModalToggle,
    handleSave,
  }
}
