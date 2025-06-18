'use client'

import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form'

import { FPBox } from '@/components/Box'
import Layout from '@/components/template/Layout'
import { Text } from '@/components/Text'
import { TextInput } from '@/components/TextInput'

import { IClient } from '@/services/clients/types'
import { getClient, postClient } from '@/services/clients'
import { Toast } from '@/components/Toast'
import { maskCPF, maskRG } from '@/helpers/maskCep'
import { zodResolver } from '@hookform/resolvers/zod'
import { clientSchema } from './schema'
import { parsePatients } from '@/app/home/utils'
import { FPTable } from '@/components/TableCollapse'
import { Box, Paper, TextField } from '@mui/material'
import { useDebounceState } from '@/hook/use-debounce-state'
import EditIcon from '@mui/icons-material/Edit'
import { Modal, Button } from '@mui/material'
import Link from 'next/link'
import { ErrorComponent } from '@/components/Error'
import { getColumns, subColumns } from '@/utils/table-columns'

export default function Paciente() {
  const queryClient = useQueryClient()
  const [debounceSearch, search, setSearch] = useDebounceState<
    string | undefined
  >(undefined, 1000)
  const [clientData, setClientData] = useState<IClient[]>([])
  const [open, setOpen] = useState(false)

  const [pagination, setPagination] = useState({
    page: 1,
    itemsPerPage: 10,
    total: 10,
  })

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const methods = useForm({
    criteriaMode: 'all',
    resolver: zodResolver(clientSchema),
    defaultValues: {
      id: 0,
      name: '',
      // address: {
      //   street: '',
      //   number: '',
      //   zipCode: '',
      //   neighborhood: '',
      //   city: '',
      //   UF: '',
      //   complement: '',
      // },
      email: '',
      address: '',
      document: '',
      ieRg: '',
      telephone: '',
      // obsAboutPatient: '',
      // files: [],
    },
  })

  const { mutate, isSuccess } = useMutation({
    mutationFn: postClient,
    onSuccess: () => {
      methods.reset()
      queryClient.invalidateQueries({ queryKey: ['clients'] })
    },
  })

  const onSubmit: SubmitHandler<IClient> = (data) => {
    mutate({
      id: data.id,
      name: data.name,
      email: data.email,
      address: data.address,
      document: data.document,
      ieRg: data.ieRg,
      telephone: data.telephone,
    })
  }

  let { data, error, isLoading } = useQuery({
    queryKey: ['clients', pagination, debounceSearch],
    queryFn: async () => {
      const response = await getClient({
        paginate: true,
        current_page: pagination.page,
        per_page: pagination.itemsPerPage,
        total: pagination.total,
        filter: { name: debounceSearch ?? '' },
      })

      const updatedData = response.data.map((client: IClient) => ({
        ...client,
        isOpen: false,
      }))

      setClientData(updatedData)
      return { ...response, data: updatedData }
    },
  })

  const handleOpenRow = (rowData: IClient) => {
    const updatedData = clientData.map((client) =>
      client.id === rowData.id ? { ...client, isOpen: !client.isOpen } : client,
    )

    setClientData(updatedData)
  }

  const columns = getColumns(handleOpenRow)

  if (error) {
    return <ErrorComponent error={error} />
  }

  return (
    <Layout titulo="Cadastro de Paciente" className="font-bold">
      {isSuccess && (
        <Toast
          item={{ message: 'Paciente criada com sucesso!', type: 'success' }}
        />
      )}

      <Button variant="contained" color="primary" onClick={handleOpen}>
        Novo Paciente
      </Button>

      <Modal
        className="flex justify-center items-center"
        open={open}
        onClose={handleClose}
      >
        <Box
          sx={{ width: 600, height: 'auto', backgroundColor: 'white', p: 2 }}
        >
          <FormProvider {...methods}>
            <FPBox
              as="form"
              className="p-1"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <Text fontSize="xl">Cadastro de paciente</Text>
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
                  />
                )}
              />
              {methods.formState.errors.name && (
                <Text color="red-500">
                  {methods.formState.errors.name.message}
                </Text>
              )}
              <Controller
                name="document"
                control={methods.control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    width="full"
                    value={maskCPF(field.value)}
                    onChange={field.onChange}
                    placeholder="Digite o seu CPF"
                  />
                )}
              />
              {methods.formState.errors.document && (
                <Text color="red-500">
                  {methods.formState.errors.document.message}
                </Text>
              )}
              <Controller
                name="ieRg"
                control={methods.control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    width="full"
                    value={maskRG(field.value)}
                    onChange={field.onChange}
                    placeholder="Digite o seu RG"
                  />
                )}
              />
              {methods.formState.errors.ieRg && (
                <Text color="red-500">
                  {methods.formState.errors.ieRg.message}
                </Text>
              )}
              <Controller
                name="email"
                control={methods.control}
                rules={{
                  required: 'Campo obrigatório',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Email inválido',
                  },
                }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Digite o Email"
                  />
                )}
              />
              {methods.formState.errors.email && (
                <Text color="red-500">
                  {methods.formState.errors.email.message}
                </Text>
              )}
              <TextInput name="submit" type="submit" />
            </FPBox>
          </FormProvider>
        </Box>
      </Modal>
      {/* <FormProvider {...methods}>
        <FPBox
          as="form"
          className="p-1"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Text fontSize="xl">Cadastro de paciente</Text>
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
              />
            )}
          />
          {methods.formState.errors.name && (
            <Text color="red-500">{methods.formState.errors.name.message}</Text>
          )}
          <Controller
            name="document"
            control={methods.control}
            render={({ field }) => (
              <TextInput
                {...field}
                width="full"
                value={maskCPF(field.value)}
                onChange={field.onChange}
                placeholder="Digite o seu CPF"
              />
            )}
          />
          {methods.formState.errors.document && (
            <Text color="red-500">
              {methods.formState.errors.document.message}
            </Text>
          )}
          <Controller
            name="ieRg"
            control={methods.control}
            render={({ field }) => (
              <TextInput
                {...field}
                width="full"
                value={maskRG(field.value)}
                onChange={field.onChange}
                placeholder="Digite o seu RG"
              />
            )}
          />
          {methods.formState.errors.ieRg && (
            <Text color="red-500">{methods.formState.errors.ieRg.message}</Text>
          )}
          {/* <Cep /> */}
      {/* <Controller
        name="email"
        control={methods.control}
        rules={{
          required: 'Campo obrigatório',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: 'Email inválido',
          },
        }}
        render={({ field }) => (
          <TextInput
            {...field}
            value={field.value}
            onChange={field.onChange}
            placeholder="Digite o Email"
          />
        )}
      />
      {methods.formState.errors.email && (
        <Text color="red-500">{methods.formState.errors.email.message}</Text>
      )} */}
      {/* <Controller
            name="obsAboutPatient"
            control={methods.control}
            render={({ field }) => (
              <TextAreaInput
                {...field}
                value={field.value}
                onChange={field.onChange}
                placeholder="Digite as observações sobre o paciente"
              />
            )}
          /> */}
      {/* <FileInput /> */}
      {/* {methods.formState.errors.files && <Text>Campo obrigatório</Text>} */}
      {/* <TextInput type="submit" />
        </FPBox>
      </FormProvider>
      <hr className="w-full border-black box-border mb-8" />  */}
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
          columns={columns}
          data={parsePatients({
            ...data,
            data: clientData,
          })}
          columnsCollapse={subColumns}
          isLoading={isLoading}
          pagination={pagination}
          setPagination={setPagination}
          paginationItems={[10, 20, 30, 40]}
        />
      </Paper>
    </Layout>
  )
}
