'use client'

import React from 'react'
import { Controller, FormProvider } from 'react-hook-form'
import { FPBox } from '@/components/Box'
import Layout from '@/components/template/Layout'
import { Text } from '@/components/Text'
import { TextInput } from '@/components/TextInput'
import { Toast } from '@/components/Toast'
import { parseQuestions } from '@/app/home/utils'
import { FPTable } from '@/components/TableCollapse'
import {
  Box,
  Paper,
  TextField,
  Modal,
  Button,
  CircularProgress,
} from '@mui/material'
import { ErrorComponent } from '@/components/Error'
import { columnsQuestions } from '@/utils/table-columns'
import { useQuestionController } from '../controller'

const QuestionModal: React.FC<{
  open: boolean
  onClose: () => void
  methods: any
  onSubmit: any
  isMutating: boolean
}> = ({ open, onClose, methods, onSubmit, isMutating }) => (
  <Modal
    className="flex justify-center items-center"
    open={open}
    onClose={onClose}
    aria-labelledby="patient-modal-title"
    aria-describedby="patient-modal-description"
  >
    <Box
      sx={{
        width: { xs: '90%', sm: 600 },
        maxHeight: '90vh',
        backgroundColor: 'white',
        p: 3,
        borderRadius: 2,
        boxShadow: 24,
        overflow: 'auto',
      }}
    >
      <FormProvider {...methods}>
        <FPBox
          as="form"
          className="space-y-4"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Text
            id="patient-modal-title"
            fontSize="xl"
            className="font-semibold"
          >
            Gerenciamento de pergunta
          </Text>

          <Controller
            name="name"
            control={methods.control}
            render={({ field }) => (
              <TextInput
                {...field}
                width="full"
                type="text"
                placeholder="Digite o nome do paciente"
                disabled={isMutating}
                aria-describedby="name-error"
              />
            )}
          />

          {methods.formState.errors.name && (
            <Text
              id="name-error"
              color="red-500"
              className="text-sm"
              role="alert"
            >
              {methods.formState.errors.name.message}
            </Text>
          )}

          <div className="flex gap-2 justify-end pt-4">
            <Button variant="outlined" onClick={onClose} disabled={isMutating}>
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isMutating}
              startIcon={isMutating ? <CircularProgress size={16} /> : null}
            >
              {isMutating ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </FPBox>
      </FormProvider>
    </Box>
  </Modal>
)

const SearchSection: React.FC<{
  search: string | undefined
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  isLoading: boolean
}> = ({ search, onSearchChange, isLoading }) => (
  <div className="mb-4">
    <TextField
      label="Buscar paciente por nome"
      variant="outlined"
      size="medium"
      margin="dense"
      value={search ?? ''}
      onChange={onSearchChange}
      disabled={isLoading}
      placeholder="Digite o nome para buscar..."
      className="min-w-[300px]"
      slotProps={{
        input: {
          'aria-label': 'Campo de busca por nome do paciente',
        },
      }}
    />
  </div>
)

const ActionBar: React.FC<{
  onNewPatient: () => void
  isLoading: boolean
}> = ({ onNewPatient, isLoading }) => (
  <div className="mb-6 flex justify-between items-center">
    <h1 className="text-2xl font-bold text-gray-800">
      Gerenciamento de Pacientes
    </h1>
    <Button
      variant="contained"
      color="primary"
      onClick={onNewPatient}
      disabled={isLoading}
      className="px-6 py-2"
    >
      + Novo Paciente
    </Button>
  </div>
)

export default function QuestionView() {
  const {
    openModal,
    questionData,
    pagination,
    search,

    isLoading,
    error,
    isSuccess,
    isMutating,

    methods,

    handleOpen,
    handleClose,
    onSubmit,
    handleSearchChange,
    setPagination,

    data,
  } = useQuestionController()

  if (error) {
    return <ErrorComponent error={error} />
  }

  return (
    <Layout titulo="Cadastro de Paciente" className="font-bold">
      {isSuccess && (
        <Toast
          item={{
            message: 'Paciente cadastrado com sucesso!',
            type: 'success',
          }}
        />
      )}

      <ActionBar onNewPatient={handleOpen} isLoading={isLoading} />

      <QuestionModal
        open={openModal}
        onClose={handleClose}
        methods={methods}
        onSubmit={onSubmit}
        isMutating={isMutating}
      />

      <Paper className="p-6 shadow-sm">
        <SearchSection
          search={search}
          onSearchChange={handleSearchChange}
          isLoading={isLoading}
        />

        <FPTable
          columns={columnsQuestions()}
          data={parseQuestions({
            ...data,
            data: questionData,
          })}
          isLoading={isLoading}
          pagination={pagination}
          setPagination={setPagination}
          paginationItems={[10, 20, 30, 50]}
          emptyMessage="Nenhum paciente encontrado"
        />
      </Paper>
    </Layout>
  )
}
