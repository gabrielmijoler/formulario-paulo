"use client"
// views/MedicalRecordFormView.tsx
import React from 'react'
import { Text } from '@/components/Text'
import { useMedicalRecordController } from '../controller'
import { SelectField } from '../components/select-field'
import { ClientInfoFields } from '../components/client-info-fields'
import { ActionButton } from '../components/action-button'
import { ModalQuestion } from '../components/modal-question'
import { IClient } from '@/services/clients/types'
import { IPathologiesResponse } from '@/services/pathologies/types'
import { IQuestion, IQuestionResponse } from '@/services/questions/types'
import { GetApp } from '@mui/icons-material'

interface MedicalRecordFormViewProps {
  clients: IClient[]
  pathologies: IPathologiesResponse[]
  questions: IQuestionResponse[]
  onSubmit: (data: any) => void
}

export const MedicalRecordFormView = ({
  clients,
  pathologies,
  questions,
  onSubmit,
}: MedicalRecordFormViewProps) => {
  const {
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
  } = useMedicalRecordController({
    clients,
    pathologies,
    questions,
    onSubmit,
  })

  return (
    <form className="p-1 space-y-4" onSubmit={handleSubmit}>
      <header>
        <Text fontSize="2xl" className="font-bold">
          Prontuário Médico
        </Text>
        <hr className="w-full border-black border-t-2 mt-2 mb-6" />
      </header>

      <SelectField
        name="client"
        label="Paciente"
        control={control}
        errors={errors}
        options={clients}
        value={getValues('client')?.id}
        onChange={handleClientChange}
        getOptionLabel={(client) => client.name}
        getOptionSecondary={(client) => client.email}
        getOptionValue={(client) => client.id}
      />

      <ClientInfoFields client={clientWatch} isVisible={isContentSelected} />

      <SelectField
        name="pathologies"
        label="Patologias"
        control={control}
        errors={errors}
        options={pathologies}
        value={
          Array.isArray(getValues('pathologies'))
            ? getValues('pathologies').map((p) => p.id)
            : []
        }
        onChange={handlePathologyChange}
        getOptionLabel={(pathology) => pathology.code}
        getOptionSecondary={(pathology) => pathology.description}
        getOptionValue={(pathology) => pathology.id}
      />
      {questionData.map((q) => (
        <div key={q.id}>
          <strong>{q.name}</strong>: {q.response}
        </div>
      ))}
      <ActionButton
        variant="secondary"
        onClick={handleModalToggle}
        className="w-48 h-10"
      >
        Adicionar Perguntas
      </ActionButton>
      <ModalQuestion
        control={control}
        errors={errors}
        optionsQuestion={questions.map((q) => ({
          id: q.id,
          value: q.name ?? q.name ?? String(q.id),
        }))}
        questionsWatch={questionsWatch}
        setValue={setValue}
        modalOpen={modalOpen}
        handleModal={handleModalToggle}
        onSave={handleSave}
        questionData={questionData}
      />
      <div className="flex gap-4 pt-4">
        <ActionButton type="submit" variant="primary" className="flex-1">
          Cadastrar Prontuário
        </ActionButton>

        <ActionButton
          variant="conditional"
          condition={isContentSelected}
          className="flex-1"
        >
          Salvar Rascunho
        </ActionButton>
      </div>
    </form>
  )
}
