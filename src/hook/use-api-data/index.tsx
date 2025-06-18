import { useQuery } from '@tanstack/react-query'
import { IClient, IPathology, IQuestion } from '@/app/medical-record/controller'
import { getClient } from '@/services/clients'
import { getPathologies } from '@/services/pathologies'

interface UseApiDataReturn {
  clients: IClient[]
  pathologies: IPathology[]
  questions: IQuestion[]
  loading: boolean
  error: string | null
  refetch: () => void
}

export const useApiData = (): UseApiDataReturn => {
  const {
    data: clients = [],
    isLoading: clientsLoading,
    error: clientsError,
    refetch: refetchClients,
  } = useQuery({
    queryKey: ['clients'],
    queryFn: getClient(),
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos (anteriormente cacheTime)
  })

  const {
    data: pathologies = [],
    isLoading: pathologiesLoading,
    error: pathologiesError,
    refetch: refetchPathologies,
  } = useQuery({
    queryKey: ['pathologies'],
    queryFn: getPathologies(),
    staleTime: 10 * 60 * 1000, // 10 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos
  })

  const {
    data: questions = [],
    isLoading: questionsLoading,
    error: questionsError,
    refetch: refetchQuestions,
  } = useQuery({
    queryKey: ['questions'],
    queryFn: getQuestions(),
    staleTime: 15 * 60 * 1000, // 15 minutos
    gcTime: 60 * 60 * 1000, // 1 hora
  })

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
    clients,
    pathologies,
    questions,
    loading,
    error,
    refetch,
  }
}
