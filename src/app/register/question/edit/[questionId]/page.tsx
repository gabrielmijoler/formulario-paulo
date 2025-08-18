'use client'

import { use, useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { TextInput } from '@/components/TextInput'
import { getQuestionsById, putQuestion } from '@/services/questions'
import { questionSchema } from '../../schema'

interface ParamsID {
  params: Promise<{ questionId: string }>
}
export default function PatientEdit({ params }: Readonly<ParamsID>) {
  const { questionId } = use(params)
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['questionsById', questionId],
    queryFn: async () => getQuestionsById(questionId),
  })

  const { mutate } = useMutation({
    mutationFn: putQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['questionsById', questionId],
      })
    },
  })

  const methods = useForm({
    criteriaMode: 'all',
    resolver: zodResolver(questionSchema),
    defaultValues: {
      name: '',
      response: '',
    },
  })

  useEffect(() => {
    if (data) {
      methods.reset({
        name: data.name ?? '',
        response: data.response ?? '',
      })
    }
  }, [data, methods])

  const onSubmit = (formData: any) => {
    mutate({ id: questionId, ...formData })
  }

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  const nameWatch = methods.watch('name')
  const responseWatch = methods.watch('response')

  return (
    <>
      {data && (
        <form onSubmit={methods.handleSubmit(onSubmit)} className="p-3">
          <h1>{questionId}</h1>
          <div>
            <div className="grid grid-cols-2 gap-4 text-black mt-4">
              <TextInput
                name="name"
                type="text"
                value={nameWatch}
                onChange={(e) => methods.setValue('name', e.target.value)}
                label="Nome da Questão"
              />
              <TextInput
                name="response"
                onChange={(e) => methods.setValue('response', e.target.value)}
                type="text"
                value={responseWatch}
                label="Resposta"
              />
            </div>
            <button
              className="px-4 py-3 rounded-lg bg-green-500 mt-4
            border-2 focus:border-blue-500 focus:bg-white
            focus:outline-none text-black w-20"
              type="submit"
            >
              Salvar
            </button>
          </div>
        </form>
      )}
    </>
  )
}
