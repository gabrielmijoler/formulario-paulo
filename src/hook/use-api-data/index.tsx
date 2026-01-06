import { useQuery } from '@tanstack/react-query'
import { getClient } from '@/services/clients'
import { getPathologies } from '@/services/pathologies'
import React from 'react'
import { PaginationState } from '@/app/types'
import { useDebounceState } from '../use-debounce-state'
import { getQuestions } from '@/services/questions'
import { IClient } from '@/services/clients/types'
import { IPathologiesResponse } from '@/services/pathologies/types'
import { IQuestionResponse } from '@/services/questions/types'

interface UseApiDataReturn {
  clients: IClient[]
  pathologies: IPathologiesResponse[]
  questions: IQuestionResponse[]
  loading: boolean
  error: string | null
  refetch: () => void
}

export const useApiData = (): UseApiDataReturn => {
  const [pagination, setPagination] = React.useState<PaginationState>({
    page: 1,
    itemsPerPage: 10,
    total: 10,
  })
  const [debounceSearch, search, setSearch] = useDebounceState<
    string | undefined
  >(undefined, 1000)

  const {
    data: clientsResponse,
    isLoading: clientsLoading,
    error: clientsError,
    refetch: refetchClients,
  } = useQuery({
    queryKey: ['clients_medical_record', pagination, debounceSearch],
    queryFn: () =>
      getClient({
        paginate: true,
        current_page: pagination.page,
        per_page: pagination.itemsPerPage,
        total: pagination.total,
        filter: { name: debounceSearch ?? '' },
        relations: 'clientAddress',
      }),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })

  const {
    data: pathologiesResponse,
    isLoading: pathologiesLoading,
    error: pathologiesError,
    refetch: refetchPathologies,
  } = useQuery({
    queryKey: ['pathologies'],
    queryFn: () =>
      getPathologies({
        paginate: true,
        current_page: pagination.page,
        per_page: pagination.itemsPerPage,
        total: pagination.total,
        filter: { name: debounceSearch ?? '' },
      }),
    staleTime: 10 * 60 * 1000, // 10 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos
  })

  const pathologies =
    pathologiesResponse?.data?.map((pathology: any) => ({
      ...pathology,
      isOpen: false,
    })) || []

  const {
    data: questionsResponse,
    isLoading: questionsLoading,
    error: questionsError,
    refetch: refetchQuestions,
  } = useQuery({
    queryKey: ['questions'],
    queryFn: () =>
      getQuestions({
        paginate: true,
        current_page: pagination.page,
        per_page: pagination.itemsPerPage,
        total: pagination.total,
        filter: { name: debounceSearch ?? '' },
      }),
    staleTime: 15 * 60 * 1000, // 15 minutos
    gcTime: 60 * 60 * 1000, // 1 hora
  })

  const questions = questionsResponse?.data || []

  const loading = clientsLoading || pathologiesLoading || questionsLoading
  const error =
    clientsError?.message ||
    pathologiesError?.message ||
    questionsError?.message ||
    null

  const refetch = () => {
    refetchClients()
    refetchPathologies()
    refetchQuestions()
  }
  return {
    clients: clientsResponse?.data || [],
    pathologies,
    questions,
    loading,
    error,
    refetch,
  }
}
