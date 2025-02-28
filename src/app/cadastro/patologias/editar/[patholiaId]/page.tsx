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
  params: { patholiaId: string }
}
export default function PatientEdit({ params }: ParamsID) {
  const { patholiaId } = use(params)
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['pathologiaById', patholiaId],
    queryFn: async () => getPathologiesByID(patholiaId),
  })

  const { mutate } = useMutation({
    mutationFn: putPathologies,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['pathologiaById', patholiaId],
      })
    },
  })

  const methods = useForm({
    criteriaMode: 'all',
    resolver: zodResolver(patholiaSchema),
    defaultValues: {
      pathologias: {
        code: '',
        description: '',
      },
    },
  })

  useEffect(() => {
    if (data) {
      methods.reset({ pathologias: data })
    }
  }, [data, methods])

  const onSubmit = (formData: any) => {
    mutate({ id: patholiaId, ...formData })
  }

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  const clientWatch = methods.watch('pathologias')

  return (
    <>
      {data && (
        <form onSubmit={methods.handleSubmit(onSubmit)} className="p-3">
          <h1>{patholiaId}</h1>
          <div>
            <div className="grid grid-cols-2 gap-4 text-black mt-4">
              <TextInput
                name="pathologias.code"
                type="text"
                value={clientWatch.code}
                onChange={(e) =>
                  methods.setValue('pathologias.code', e.target.value)
                }
                label="Código"
              />
              <TextInput
                name="pathologias.description"
                onChange={(e) =>
                  methods.setValue('pathologias.description', e.target.value)
                }
                type="text"
                value={clientWatch.description}
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
