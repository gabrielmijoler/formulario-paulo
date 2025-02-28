'use client'

import { use, useEffect } from 'react'
import { getClientByID, putClient } from '@/services/clients'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { clientSchema } from '../../schema'
import { IClient } from '@/services/clients/types'
import { TextInput } from '@/components/TextInput'

interface ParamsID {
  params: { patientsId: string }
}
export default function PatientEdit({ params }: ParamsID) {
  const { patientsId } = use(params)
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['patients', patientsId],
    queryFn: async () => getClientByID(patientsId),
  })

  const { mutate } = useMutation({
    mutationFn: putClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients', patientsId] })
    },
  })

  const methods = useForm({
    criteriaMode: 'all',
    resolver: zodResolver(clientSchema),
    defaultValues: {
      client: {
        id: 0,
        name: '',
        email: '',
        address: '',
        document: '',
        ieRg: '',
        telephone: '',
      },
    },
  })

  useEffect(() => {
    if (data) {
      methods.reset({ client: data })
    }
  }, [data, methods])

  const onSubmit = (formData: any) => {
    console.log(formData)
    mutate({ id: patientsId, ...formData })
  }

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  const clientWatch = methods.watch('client')
  console.log(clientWatch)
  return (
    <>
      {data && (
        <form onSubmit={methods.handleSubmit(onSubmit)} className="p-3">
          <h1>{patientsId}</h1>
          <h2 className="text-blue-600">{data.name}</h2>
          <div>
            <div className="grid grid-cols-2 gap-4 text-black mt-4">
              <TextInput
                name="client.name"
                type="text"
                value={clientWatch.name}
                onChange={(e) =>
                  methods.setValue('client.name', e.target.value)
                }
                label="Nome"
              />
              <TextInput
                name="client.document"
                onChange={(e) =>
                  methods.setValue('client.document', e.target.value)
                }
                type="text"
                value={clientWatch.document}
                label="Documento"
              />
              <TextInput
                name="client.address"
                type="text"
                value={clientWatch.address}
                onChange={(e) =>
                  methods.setValue('client.address', e.target.value)
                }
                placeholder="Endereço"
                label="Endereço"
              />
              <TextInput
                name="client.ieRg"
                type="text"
                value={clientWatch.ieRg}
                onChange={(e) =>
                  methods.setValue('client.ieRg', e.target.value)
                }
                placeholder="IE/RG"
                label="RG"
              />
              <TextInput
                name="client.email"
                type="text"
                value={clientWatch.email}
                onChange={(e) =>
                  methods.setValue('client.email', e.target.value)
                }
                placeholder="E-mail"
                label="Email"
              />
              <TextInput
                name="client.telephone"
                type="text"
                value={clientWatch.telephone}
                onChange={(e) =>
                  methods.setValue('client.telephone', e.target.value)
                }
                placeholder="Telefone"
                label="Telefone"
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
