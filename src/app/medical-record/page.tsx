import React from 'react'
import { Toast } from '@/components/Toast'
import { useApiData } from '@/hook/use-api-data'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { ErrorMessage } from '@/components/ErrorMessage'
import { MedicalRecordFormView } from './view'
import { useMedicalRecordMutation } from '@/hook/use-medical-record-mutation'

export const MedicalRecordPage = () => {
  const { clients, pathologies, questions, loading, error, refetch } =
    useApiData()
  const {
    isLoading: submitting,
    error: submitError,
    isSuccess: submitSuccess,
    reset: resetMutation,
  } = useMedicalRecordMutation()

  const handleSubmit = (data: any) => {
    console.log(data)
  }

  const handleRetry = () => {
    refetch()
  }

  const handleClearSuccess = () => {
    resetMutation()
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <ErrorMessage message={error} onRetry={handleRetry} />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {submitSuccess && (
        <Toast
          item={{ message: 'Prontuário salvo com sucesso!', type: 'success' }}
        />
      )}

      {submitError && (
        <div className="mb-4">
          <ErrorMessage message={submitError} onRetry={resetMutation} />
        </div>
      )}

      <div className={`${submitting ? 'opacity-50 pointer-events-none' : ''}`}>
        <MedicalRecordFormView
          clients={clients}
          pathologies={pathologies}
          questions={questions}
          onSubmit={handleSubmit}
        />
      </div>

      {submitting && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex items-center">
            <LoadingSpinner />
            <span className="ml-4">Salvando prontuário...</span>
          </div>
        </div>
      )}
    </div>
  )
}
