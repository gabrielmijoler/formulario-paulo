import { postMedicalRecord } from '@/services/medical-record'
import { IMedicalRecordRequest } from '@/services/medical-record/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface UseMedicalRecordMutationReturn {
  isLoading: boolean
  error: string | null
  isSuccess: boolean
  reset: () => void
}

export const useMedicalRecordMutation = (): UseMedicalRecordMutationReturn => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    // mutationFn: postMedicalRecord({ ...params }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medical-records'] })
    },
    onError: (error) => {
      console.error('Erro ao salvar prontuário:', error)
    },
  })

  return {
    isLoading: mutation.isPending,
    error: mutation.error?.message ?? null,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  }
}
