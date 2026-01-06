'use client'
// views/MedicalRecordFormView.tsx
import React from 'react'
import { Text } from '@/components/Text'
import { SelectField } from '../components/select-field'
import { ClientInfoFields } from '../components/client-info-fields'
import { ActionButton } from '../components/action-button'
import { ModalQuestion } from '../components/modal-question'
import { IClient } from '@/services/clients/types'
import { IPathologiesResponse } from '@/services/pathologies/types'
import { IQuestionResponse } from '@/services/questions/types'
import { TextAreaInput } from '@/components/TextInputArea'
import { Controller, UseFormGetValues, FieldValues } from 'react-hook-form'

interface MedicalRecordFormViewProps {
  clients: IClient[]
  pathologies: IPathologiesResponse[]
  questions: IQuestionResponse[]
  control: any
  errors: any
  isContentSelected: boolean
  modalOpen: boolean
  clientWatch: any
  questionsWatch: any
  questionData: IQuestionResponse[]
  handleSubmit: any
  setValue: any
  getValues: any
  handleClientChange: any
  handlePathologyChange: any
  handleModalToggle: any
  handleSave: any
}

export const MedicalRecordFormView = ({
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
}: MedicalRecordFormViewProps) => {
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
        value={getValues('pathologies').map((p: IPathologiesResponse) => p.id)}
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
      <Controller
        name="symptoms"
        control={control}
        render={({ field }) => (
          <TextAreaInput
            {...field}
            label="Sintomas"
            placeholder="Digite os sintomas"
          />
        )}
      />
      <Controller
        name="clinicalExam"
        control={control}
        render={({ field }) => (
          <TextAreaInput
            {...field}
            label="Exame Clínico"
            placeholder="Digite o exame clínico"
          />
        )}
      />
      <Controller
        name="conclusion"
        control={control}
        render={({ field }) => (
          <TextAreaInput
            {...field}
            label="Conclusão"
            placeholder="Digite a conclusão"
          />
        )}
      />

      <div className="flex gap-4 pt-4">
        <ActionButton type="submit" variant="primary">
          Cadastrar Prontuário
        </ActionButton>
      </div>
    </form>
  )
}
