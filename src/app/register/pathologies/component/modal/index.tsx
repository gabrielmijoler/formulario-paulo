import { Controller, FormProvider, UseFormReturn } from 'react-hook-form'
import { Modal, Button, Box } from '@mui/material'

import { FPBox } from '@/components/Box'
import { Text } from '@/components/Text'
import { TextInput } from '@/components/TextInput'
import { IPathologiesRequest } from '@/services/pathologies/types'

interface PatologiasModalProps {
  isOpen: boolean
  onClose: () => void
  methods: UseFormReturn<IPathologiesRequest>
  onSubmit: (data: IPathologiesRequest) => void
}

export const PatologiasModal = ({
  isOpen,
  onClose,
  methods,
  onSubmit,
}: PatologiasModalProps) => {
  return (
    <Modal
      className="flex justify-center items-center"
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-titulo-patologia"
      aria-describedby="modal-descricao-patologia"
    >
      <Box
        sx={{
          width: 600,
          height: 'auto',
          backgroundColor: 'white',
          p: 3,
          borderRadius: 2,
          boxShadow: 24,
          maxHeight: '90vh',
          overflow: 'auto',
        }}
      >
        <FormProvider {...methods}>
          <FPBox
            as="form"
            className="p-1 w-full"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Text fontSize="xl" className="mb-6 font-bold text-gray-800">
              Cadastro de Patologia
            </Text>

            <div className="space-y-5">
              <div>
                <Controller
                  name="code"
                  control={methods.control}
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      width="full"
                      type="text"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Digite o código da patologia"
                      label="Código"
                    />
                  )}
                />
                {methods.formState.errors.code && (
                  <Text color="red-500" className="text-sm mt-1">
                    {methods.formState.errors.code.message}
                  </Text>
                )}
              </div>

              <div>
                <Controller
                  name="description"
                  control={methods.control}
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      width="full"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Digite a descrição da patologia"
                      label="Descrição"
                    />
                  )}
                />
                {methods.formState.errors.description && (
                  <Text color="red-500" className="text-sm mt-1">
                    {methods.formState.errors.description.message}
                  </Text>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-8">
              <Button
                variant="outlined"
                onClick={onClose}
                type="button"
                className="min-w-[100px]"
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={methods.formState.isSubmitting}
                className="min-w-[100px]"
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
