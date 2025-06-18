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
import { Toast } from '@/components/Toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { questionSchema } from './schema'
import { parseQuestions } from '@/app/home/utils'
import { FPTable } from '@/components/TableCollapse'
import { Box, Paper, TextField } from '@mui/material'
import { useDebounceState } from '@/hook/use-debounce-state'
import { Modal, Button } from '@mui/material'
import { ErrorComponent } from '@/components/Error'
import { IQuestion } from '@/services/questions/types'
import { getQuestion, postQuestion } from '@/services/questions'
import { columnsQuestions } from '@/utils/table-columns'

export default function Paciente() {
  const queryClient = useQueryClient()
  const [debounceSearch, search, setSearch] = useDebounceState<
    string | undefined
  >(undefined, 1000)
  const [questionData, setQuestionData] = useState<IQuestion[]>([])
  const [openModal, setOpenModal] = useState(false)

  const [pagination, setPagination] = useState({
    page: 1,
    itemsPerPage: 10,
    total: 10,
  })

  const handleOpen = () => setOpenModal(true)
  const handleClose = () => setOpenModal(false)

  const methods = useForm({
    criteriaMode: 'all',
    resolver: zodResolver(questionSchema),
    defaultValues: {
      name: '',
      response: '',
    },
  })

  const { mutate, isSuccess } = useMutation({
    mutationFn: postQuestion,
    onSuccess: () => {
      methods.reset()
      queryClient.invalidateQueries({ queryKey: ['questions'] })
    },
  })

  const onSubmit: SubmitHandler<IQuestion> = (data) => {
    mutate({
      response: data.response,
      name: data.name,
    })
  }

  let { data, error, isLoading } = useQuery({
    queryKey: ['questions', pagination, debounceSearch],
    queryFn: async () => {
      const response = await getQuestion({
        paginate: true,
        current_page: pagination.page,
        per_page: pagination.itemsPerPage,
        total: pagination.total,
        filter: { name: debounceSearch ?? '' },
      })

      const updatedData = response.data.map((question: IQuestion) => ({
        ...question,
        response: question.response,
        name: question.name,
        isOpen: false,
      }))

      setQuestionData(updatedData)
      return { ...response, data: updatedData }
    },
  })

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
        open={openModal}
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
              <TextInput name="submit" type="submit" />
            </FPBox>
          </FormProvider>
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
          columns={columnsQuestions()}
          data={parseQuestions({
            ...data,
            data: questionData,
          })}
          isLoading={isLoading}
          pagination={pagination}
          setPagination={setPagination}
          paginationItems={[10, 20, 30, 40]}
        />
      </Paper>
    </Layout>
  )
}
