import { Controller, FormProvider, UseFormReturn } from 'react-hook-form'
import { Modal, Button, Box } from '@mui/material'
import { FPBox } from '@/components/Box'
import { Text } from '@/components/Text'
import { TextInput } from '@/components/TextInput'
import { IClient } from '@/services/clients/types'
import { maskCPF, maskRG } from '@/helpers/maskCep'
import Cep from '../Cep'

interface PacienteModalProps {
  isOpen: boolean
  onClose: () => void
  methods: UseFormReturn<IClient>
  onSubmit: (data: IClient) => void
}

export const PacienteModal = ({
  isOpen,
  onClose,
  methods,
  onSubmit,
}: PacienteModalProps) => {
  return (
    <Modal
      className="flex justify-center items-center"
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-titulo"
      aria-describedby="modal-descricao"
    >
      <Box
        sx={{
          width: 600,
          height: 'auto',
          backgroundColor: 'white',
          p: 2,
          borderRadius: 2,
          boxShadow: 24,
          maxHeight: '90vh',
          overflow: 'auto',
        }}
      >
        <FormProvider {...methods}>
          <FPBox
            as="form"
            className="p-1"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Text fontSize="xl" className="mb-4 font-bold">
              Cadastro de Paciente
            </Text>

            <div className="space-y-4">
              <div>
                <Controller
                  name="name"
                  control={methods.control}
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      width="full"
                      type="text"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Digite o nome"
                      label="Nome"
                    />
                  )}
                />
                {methods.formState.errors.name && (
                  <Text color="red-500" className="text-sm mt-1">
                    {methods.formState.errors.name.message}
                  </Text>
                )}
              </div>

              <div>
                <Controller
                  name="document"
                  control={methods.control}
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      width="full"
                      value={maskCPF(field.value)}
                      onChange={field.onChange}
                      placeholder="Digite o CPF"
                      label="CPF"
                    />
                  )}
                />
                {methods.formState.errors.document && (
                  <Text color="red-500" className="text-sm mt-1">
                    {methods.formState.errors.document.message}
                  </Text>
                )}
              </div>

              <div>
                <Controller
                  name="ieRg"
                  control={methods.control}
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      width="full"
                      value={maskRG(field.value)}
                      onChange={field.onChange}
                      placeholder="Digite o RG"
                      label="RG"
                    />
                  )}
                />
                {methods.formState.errors.ieRg && (
                  <Text color="red-500" className="text-sm mt-1">
                    {methods.formState.errors.ieRg.message}
                  </Text>
                )}
              </div>

              <div>
                <Controller
                  name="email"
                  control={methods.control}
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      width="full"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Digite o email"
                      label="Email"
                      type="email"
                    />
                  )}
                />
                {methods.formState.errors.email && (
                  <Text color="red-500" className="text-sm mt-1">
                    {methods.formState.errors.email.message}
                  </Text>
                )}
              </div>
              <Cep />
              <div>
                <Controller
                  name="telephone"
                  control={methods.control}
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      width="full"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Digite o telefone"
                      label="Telefone"
                      type="text"
                    />
                  )}
                />
                {methods.formState.errors.telephone && (
                  <Text color="red-500" className="text-sm mt-1">
                    {methods.formState.errors.telephone.message}
                  </Text>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outlined" onClick={onClose} type="button">
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={methods.formState.isSubmitting}
              >
                {methods.formState.isSubmitting ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </FPBox>
        </FormProvider>
      </Box>
    </Modal>
  )
}
