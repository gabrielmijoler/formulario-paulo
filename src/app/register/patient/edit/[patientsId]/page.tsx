'use client'

import React, { useEffect } from 'react'
import { getClientByID, putClient } from '@/services/clients'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFormContext } from 'react-hook-form'
import { clientSchema } from '../../schema'
import { TextInput } from '@/components/TextInput'
import { IClient } from '@/services/clients/types'

interface ParamsID {
  params: Promise<{ patientsId: string }>
}

export default function PatientEdit({ params }: ParamsID) {
  const { patientsId } = React.use(params)

  const queryClient = useQueryClient()

  const methods = useForm({
    criteriaMode: 'all',
    resolver: zodResolver(clientSchema),
    defaultValues: {
      client: {
        name: '',
        email: '',
        clientAddress: {
          zipCode: '',
          street: '',
          number: '',
          complement: '',
          neighborhood: '',
          city: '',
          state: '',
        },
        document: '',
        ieRg: '',
        telephone: '',
      },
    },
  })
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

  useEffect(() => {
    if (data) {
      methods.reset({ client: data })
    }
  }, [data, methods])

  const onSubmit = (formData: any) => {
    mutate({ id: patientsId, ...formData })
  }

  if (isLoading) {
    return <h2>Loading...</h2>
  }
  const clientWatch = methods.watch('client')
  const formFields = [
    {
      name: 'name',
      label: 'Nome',
      placeholder: 'Nome',
      value: clientWatch.name ?? '',
    },
    {
      name: 'document',
      label: 'Documento',
      placeholder: 'Documento',
      value: clientWatch.document ?? '',
    },
    {
      name: 'clientAddress.street',
      label: 'Rua',
      placeholder: 'Rua',
      value: clientWatch.clientAddress?.street ?? '',
    },
    {
      name: 'clientAddress.number',
      label: 'Número',
      placeholder: 'Número',
      value: clientWatch.clientAddress?.number ?? '',
    },
    {
      name: 'clientAddress.city',
      label: 'Cidade',
      placeholder: 'Cidade',
      value: clientWatch.clientAddress?.city ?? '',
    },
    {
      name: 'clientAddress.state',
      label: 'Estado',
      placeholder: 'Estado',
      value: clientWatch.clientAddress?.state ?? '',
    },
    {
      name: 'clientAddress.complement',
      label: 'Complemento',
      placeholder: 'Complemento',
      value: clientWatch.clientAddress?.complement ?? '',
    },
    {
      name: 'clientAddress.neighborhood',
      label: 'Bairro',
      placeholder: 'Bairro',
      value: clientWatch.clientAddress?.neighborhood ?? '',
    },
    {
      name: 'ieRg',
      label: 'RG',
      placeholder: 'IE/RG',
      value: clientWatch.ieRg ?? '',
    },
    {
      name: 'email',
      label: 'Email',
      placeholder: 'E-mail',
      value: clientWatch.email ?? '',
    },
    {
      name: 'telephone',
      label: 'Telefone',
      placeholder: 'Telefone',
      value: clientWatch.telephone ?? '',
    },
  ] as const

  return (
    <>
      {data && (
        <form onSubmit={methods.handleSubmit(onSubmit)} className="p-3">
          <h2 className="text-blue-600">{data.name}</h2>
          <div>
            <div className="grid grid-cols-2 gap-4 text-black mt-4">
              {formFields.map((field) => (
                <TextInput
                  key={field.name}
                  name={field.name}
                  type="text"
                  value={field.value}
                  onChange={(e) =>
                    methods.setValue(`client.${field.name}`, e.target.value)
                  }
                  placeholder={field.placeholder}
                  label={field.label}
                />
              ))}
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
