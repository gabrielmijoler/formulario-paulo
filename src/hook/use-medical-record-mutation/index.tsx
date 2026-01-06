import { postMedicalRecord } from '@/services/medical-record'
import { IMedicalRecordRequest } from '@/services/medical-record/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useMedicalRecordMutation = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (data: IMedicalRecordRequest) => postMedicalRecord(data),
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
    mutate: mutation.mutate,
  }
}
