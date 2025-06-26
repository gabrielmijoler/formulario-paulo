'use client'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import Layout from '@/components/template/Layout'
import { Text } from '@/components/Text'
import { TextInput } from '@/components/TextInput'
import { getQuestion, postQuestion } from '@/services/questions'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Toast } from '@/components/Toast'
import { Box, Button, Modal, Paper, TextField } from '@mui/material'
import usePagination from '@/hook/use-pagination'
import { useState } from 'react'
import { useDebounceState } from '@/hook/use-debounce-state'
import { IQuestionResponse } from '@/services/questions/types'
import { FPBox } from '@/components/Box'

type QuestionsProps = {
  name: string
  response: string
}

export default function Patologias() {
  const { pagination, setPagination } = usePagination()
  const [open, setOpen] = useState(false)
  const [debounceSearch, search, setSearch] = useDebounceState<
    string | undefined
  >(undefined, 1000)
  const [questionData, setQuestionData] = useState<IQuestionResponse[]>([])

  // const { data, error, isLoading } = useQuery({
  //   queryKey: ['questions', pagination, debounceSearch],
  //   queryFn: async () => {
  //     getQuestion(data)
  //   },
  // })

  // console.log(data)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    criteriaMode: 'all',
    defaultValues: {
      name: '',
      response: '',
    },
  })

  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: postQuestion,
    onSuccess: () => {
      reset()
    },
  })

  // if (error) {
  //   return <ErrorComponent error={error} />
  // }

  const onSubmit: SubmitHandler<QuestionsProps> = (data) => {
    mutate({ name: data.name, response: data.response })
  }

  return (
    <Layout titulo="Cadastro de Perguntas">
      {isSuccess ?? (
        <Toast
          item={{ message: 'Pergunta criada com sucesso!', type: 'success' }}
        />
      )}{' '}
      {isError ?? (
        <Toast item={{ message: 'Erro ao cria pergunta.', type: 'error' }} />
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
            <Text fontSize="xl">Cadastro de perguntas</Text>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  width="1/2"
                  type="text"
                  required
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Digite a pergunta"
                />
              )}
            />
            {errors.name && <span>Campo obrigatório</span>}
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
      {/* <Paper className="p-1">
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
          data={parseQuestions({ ...data, data: questionData })}
          isLoading={isLoading}
          pagination={pagination}
          setPagination={setPagination}
          paginationItems={[10, 20, 30, 40]}
        />
      </Paper> */}
    </Layout>
  )
}
