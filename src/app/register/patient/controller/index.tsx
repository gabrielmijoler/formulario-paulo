'use client'
import { useState, useCallback } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { IClient } from '@/services/clients/types'
import { getClient, postClient } from '@/services/clients'
import { useDebounceState } from '@/hook/use-debounce-state'
import { clientSchema } from '../schema'
import { PaginationState } from '@/app/types'
import { getPathologies } from '@/services/pathologies'
import { getMedicalRecord } from '@/services/medical-record'

export const usePacienteController = () => {
  const queryClient = useQueryClient()

  const [debounceSearch, search, setSearch] = useDebounceState<
    string | undefined
  >(undefined, 1000)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const methods = useForm<IClient>({
    criteriaMode: 'all',
    resolver: zodResolver(clientSchema),
    defaultValues: {
      id: 0,
      name: '',
      email: '',
      clientAddress: {
        zipCode: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
      },
      document: '',
      ieRg: '',
      telephone: '',
    },
  })

  const { mutate: createClient, isSuccess: isCreateSuccess } = useMutation({
    mutationFn: postClient,
    onSuccess: () => {
      methods.reset()
      queryClient.invalidateQueries({ queryKey: ['clients'] })
      handleCloseModal()
    },
    onError: (error) => {
      console.error('Erro ao criar paciente:', error)
    },
  })
  const { data, error, isLoading } = useQuery({
    queryKey: ['clients', debounceSearch],
    queryFn: async () => {
      const response = await getMedicalRecord({
        paginate: true,
        current_page: data?.pagination?.current_page,
        per_page: data?.pagination?.per_page,
        total: data?.pagination?.total,
        filter: { name: debounceSearch ?? '' },
      })
      console.log('response', response)
      return response
    },
  })
  console.log('data', data)
  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    methods.reset()
  }, [methods])

  const handleSubmit: SubmitHandler<IClient> = (data) => {
    createClient({
      id: data.id,
      name: data.name,
      email: data.email,
      clientAddress: {
        zipCode: data.clientAddress.zipCode,
        street: data.clientAddress.street,
        number: data.clientAddress.number,
        complement: data.clientAddress.complement,
        neighborhood: data.clientAddress.neighborhood,
        city: data.clientAddress.city,
        state: data.clientAddress.state,
      },
      document: data.document,
      ieRg: data.ieRg,
      telephone: data.telephone,
    })
  }

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearch(value)
    },
    [setSearch],
  )

  // const handlePaginationChange = useCallback(
  //   (newPagination: PaginationState) => {
  //     setPagination(newPagination)
  //   },
  //   [],
  // )

  return {
    isModalOpen,
    search,
    methods,
    data,
    error,
    isLoading,
    isCreateSuccess,
    handleOpenModal,
    handleCloseModal,
    handleSubmit,
    handleSearchChange,
    // handlePaginationChange,
  }
}
