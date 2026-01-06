'use client'
import React from 'react'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { ErrorMessage } from '@/components/ErrorMessage'
import { MedicalRecordFormView } from './view'
import { useMedicalRecordController } from './controller'
import { useApiData } from '@/hook/use-api-data'

export default function MedicalRecordPage() {
  const { loading, error, refetch } = useApiData()

  const {
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
    handleSubmit,
    setValue,
    getValues,
    handleClientChange,
    handlePathologyChange,
    handleModalToggle,
    handleSave,
  } = useMedicalRecordController()

  const handleRetry = () => {
    refetch()
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
      <MedicalRecordFormView
        clients={clients}
        pathologies={pathologies}
        questions={questions}
        control={control}
        errors={errors}
        isContentSelected={isContentSelected}
        modalOpen={modalOpen}
        clientWatch={clientWatch}
        questionsWatch={questionsWatch}
        questionData={questionData}
        handleSubmit={handleSubmit}
        setValue={setValue}
        getValues={getValues}
        handleClientChange={handleClientChange}
        handlePathologyChange={handlePathologyChange}
        handleModalToggle={handleModalToggle}
        handleSave={handleSave}
      />
    </div>
  )
}
