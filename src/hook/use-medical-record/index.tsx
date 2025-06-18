import { getClient } from '@/services/clients'
import { getPathologies } from '@/services/pathologies'
import { getQuestion } from '@/services/questions'
import { useQueries } from '@tanstack/react-query'

export function useMedicalRecord() {
  const results = useQueries({
    queries: [
      {
        queryKey: ['getClient'],
        queryFn: () =>
          getClient({
            paginate: false,
            per_page: 10,
            current_page: 1,
            total: 0,
            filter: {},
          }),
      },
      {
        queryKey: ['getQuestions'],
        queryFn: () => getQuestion(),
      },
      {
        queryKey: ['getPathologies'],
        queryFn: () =>
          getPathologies({
            paginate: false,
            per_page: 10,
            current_page: 1,
            total: 0,
            filter: {},
          }),
      },
    ],
  })

  return {
    clients: results[0].data?.data || [],
    questions: Array.isArray(results[1].data) ? results[1].data : [],
    pathologies: Array.isArray(results[2].data) ? results[2].data : [],
  }
}
