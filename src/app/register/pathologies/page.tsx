'use client'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import Layout from '@/components/template/Layout'
import { Text } from '@/components/Text'
import { TextInput } from '@/components/TextInput'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getPathologies, postPathologies } from '@/services/pathologies'
import {
  IPathologiesRequest,
  IPathologiesResponse,
} from '@/services/pathologies/types'
import { Toast } from '@/components/Toast'
import { parsePatholias } from '@/app/home/utils'
import { FPTable } from '@/components/TableCollapse'
import { Box, Button, Modal, Paper, TextField } from '@mui/material'
import usePagination from '@/hook/use-pagination'
import { useDebounceState } from '@/hook/use-debounce-state'
import { useState } from 'react'
import { ErrorComponent } from '@/components/Error'
import { columnsPathologies } from '@/utils/table-columns'
import { FPBox } from '@/components/Box'

export default function Patologias() {
  const [debounceSearch, search, setSearch] = useDebounceState<
    string | undefined
  >(undefined, 1000)
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    criteriaMode: 'all',
    defaultValues: {
      code: '',
      description: '',
    },
  })
  const { pagination, setPagination } = usePagination()
  const [open, setOpen] = useState(false)
  const [pathologiesData, setPathologiesData] = useState<
    IPathologiesResponse[]
  >([])
  let { data, error, isLoading } = useQuery({
    queryKey: ['pathologies', pagination, debounceSearch],
    queryFn: async () => {
      const response = await getPathologies({
        paginate: true,
        current_page: pagination.page,
        per_page: pagination.itemsPerPage,
        total: pagination.total,
        filter: { name: debounceSearch ?? '' },
      })
      console.log(response.data)
      const updatedData = response.data.map((client: any) => ({
        ...client,
        isOpen: false,
      }))

      setPathologiesData(updatedData)
      return { ...response, data: updatedData }
    },
  })

  console.log(pathologiesData)
  if (error) {
    return <ErrorComponent error={error} />
  }

  const { mutate, isSuccess } = useMutation({
    mutationFn: postPathologies,
    onSuccess: () => {
      reset()
    },
  })
  const onSubmit: SubmitHandler<IPathologiesRequest> = (data) => {
    mutate({ code: data.code, description: data.description })
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Layout titulo="Cadastro de Patologias">
      {isSuccess && (
        <Toast
          item={{ message: 'Patologia criada com sucesso!', type: 'success' }}
        />
      )}

      <Button variant="contained" color="primary" onClick={handleOpen}>
        Nova Patologia
      </Button>

      <Modal
        className="flex justify-center items-center"
        open={open}
        onClose={handleClose}
      >
        <Box
          sx={{ width: 600, height: 'auto', backgroundColor: 'white', p: 2 }}
        >
          <FPBox className="p-1 w-full" onSubmit={handleSubmit(onSubmit)}>
            <Text fontSize="xl">Cadastro de patologias</Text>
            <Controller
              name="code"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  width="1/2"
                  type="text"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Digite o código"
                />
              )}
            />
            {errors.code && <span>Campo obrigatório</span>}
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  width="1/2"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Digite a descrição"
                />
              )}
            />
            {errors.description && <span>Campo obrigatório</span>}
            <button
              className="px-4 py-3 rounded-lg bg-gray-200 mt-4
        border-2 focus:border-blue-500 focus:bg-white
        focus:outline-none text-black w-20"
              type="submit"
            >
              Enviar
            </button>
          </FPBox>
        </Box>
      </Modal>
      <Paper className="p-1">
        <TextField
          label="Buscar por nome"
          variant="outlined"
          size="medium"
          margin="dense"
          value={search ?? ''}
          onChange={(event) => setSearch(event.target.value)}
        />
        <FPTable
          columns={columnsPathologies()}
          data={parsePatholias({ ...data, data: pathologiesData })}
          isLoading={isLoading}
          pagination={pagination}
          setPagination={setPagination}
          paginationItems={[10, 20, 30, 40]}
        />
      </Paper>
    </Layout>
  )
}
