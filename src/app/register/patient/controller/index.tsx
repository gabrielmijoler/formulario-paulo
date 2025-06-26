'use client'
import { useState, useCallback } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { IClient } from '@/services/clients/types'
import { getClient, postClient } from '@/services/clients'
import { useDebounceState } from '@/hook/use-debounce-state'
import { clientSchema } from '../schema'

interface PaginationState {
  page: number
  itemsPerPage: number
  total: number
}

export const usePacienteController = () => {
  const queryClient = useQueryClient()

  const [debounceSearch, search, setSearch] = useDebounceState<
    string | undefined
  >(undefined, 1000)
  const [clientData, setClientData] = useState<IClient[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    itemsPerPage: 10,
    total: 10,
  })

  const methods = useForm<IClient>({
    criteriaMode: 'all',
    resolver: zodResolver(clientSchema),
    defaultValues: {
      id: 0,
      name: '',
      email: '',
      address: '',
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
    queryKey: ['clients', pagination, debounceSearch],
    queryFn: async () => {
      const response = await getClient({
        paginate: true,
        current_page: pagination.page,
        per_page: pagination.itemsPerPage,
        total: pagination.total,
        filter: { name: debounceSearch ?? '' },
      })

      const updatedData = response.data.map((client: IClient) => ({
        ...client,
        isOpen: false,
      }))

      setClientData(updatedData)
      return { ...response, data: updatedData }
    },
  })

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    methods.reset()
  }, [methods])

  const handleSubmit: SubmitHandler<IClient> = useCallback(
    (data) => {
      createClient({
        id: data.id,
        name: data.name,
        email: data.email,
        address: data.address,
        document: data.document,
        ieRg: data.ieRg,
        telephone: data.telephone,
      })
    },
    [createClient],
  )

  const handleOpenRow = useCallback(
    (rowData: IClient) => {
      const updatedData = clientData.map((client) =>
        client.id === rowData.id
          ? { ...client, isOpen: !client.isOpen }
          : client,
      )
      setClientData(updatedData)
    },
    [clientData],
  )

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearch(value)
    },
    [setSearch],
  )

  const handlePaginationChange = useCallback(
    (newPagination: PaginationState) => {
      setPagination(newPagination)
    },
    [],
  )

  return {
    clientData,
    isModalOpen,
    pagination,
    search,

    methods,

    data,
    error,
    isLoading,
    isCreateSuccess,

    handleOpenModal,
    handleCloseModal,
    handleSubmit,
    handleOpenRow,
    handleSearchChange,
    handlePaginationChange,
  }
}
