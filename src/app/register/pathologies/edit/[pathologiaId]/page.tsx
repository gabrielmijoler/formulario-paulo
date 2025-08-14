'use client'

import { use, useEffect } from 'react'
import { putClient } from '@/services/clients'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { TextInput } from '@/components/TextInput'
import { patholiaSchema } from '../../schema'
import { getPathologiesByID, putPathologies } from '@/services/pathologies'

interface ParamsID {
  params: Promise<{ pathologiaId: string }>
}
export default function PatientEdit({ params }: Readonly<ParamsID>) {
  const { pathologiaId } = use(params)
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['pathologiaById', pathologiaId],
    queryFn: async () => getPathologiesByID(pathologiaId),
  })

  const { mutate } = useMutation({
    mutationFn: putPathologies,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['pathologiaById', pathologiaId],
      })
    },
  })

  const methods = useForm({
    criteriaMode: 'all',
    resolver: zodResolver(patholiaSchema),
    defaultValues: {
      code: '',
      description: '',
    },
  })

  useEffect(() => {
    if (data) {
      methods.reset(data)
    }
  }, [data, methods])

  const onSubmit = (formData: any) => {
    mutate({ id: pathologiaId, ...formData })
  }

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  const codeWatch = methods.watch('code')
  const descriptionWatch = methods.watch('description')

  return (
    <>
      {data && (
        <form onSubmit={methods.handleSubmit(onSubmit)} className="p-3">
          <h1>{pathologiaId}</h1>
          <div>
            <div className="grid grid-cols-2 gap-4 text-black mt-4">
              <TextInput
                name="code"
                type="text"
                value={codeWatch}
                onChange={(e) => methods.setValue('code', e.target.value)}
                label="Código"
              />
              <TextInput
                name="description"
                onChange={(e) =>
                  methods.setValue('description', e.target.value)
                }
                type="text"
                value={descriptionWatch}
                label="Descrição"
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
