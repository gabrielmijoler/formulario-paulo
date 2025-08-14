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

export default function PatientEdit({ params }: Readonly<ParamsID>) {
  const { patientsId } = React.use(params)

  const queryClient = useQueryClient()

  const methods = useForm<IClient>({
    criteriaMode: 'all',
    resolver: zodResolver(clientSchema),
    defaultValues: {
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
      methods.reset(data)
    }
  }, [data, methods])

  const onSubmit = (formData: any) => {
    mutate({ id: patientsId, ...formData })
  }

  if (isLoading) {
    return <h2>Loading...</h2>
  }
  const nameWatch = methods.watch('name')
  const documentWatch = methods.watch('document')
  const clientAddressWatch = methods.watch('clientAddress')
  const ieRgWatch = methods.watch('ieRg')
  const emailWatch = methods.watch('email')
  const telephoneWatch = methods.watch('telephone')

  const formFields = [
    {
      name: 'name',
      label: 'Nome',
      placeholder: 'Nome',
      value: nameWatch ?? '',
    },
    {
      name: 'document',
      label: 'Documento',
      placeholder: 'Documento',
      value: documentWatch ?? '',
    },
    {
      name: 'clientAddress.street',
      label: 'Rua',
      placeholder: 'Rua',
      value: clientAddressWatch?.street ?? '',
    },
    {
      name: 'clientAddress.number',
      label: 'Número',
      placeholder: 'Número',
      value: clientAddressWatch?.number ?? '',
    },
    {
      name: 'clientAddress.city',
      label: 'Cidade',
      placeholder: 'Cidade',
      value: clientAddressWatch?.city ?? '',
    },
    {
      name: 'clientAddress.state',
      label: 'Estado',
      placeholder: 'Estado',
      value: clientAddressWatch?.state ?? '',
    },
    {
      name: 'clientAddress.complement',
      label: 'Complemento',
      placeholder: 'Complemento',
      value: clientAddressWatch?.complement ?? '',
    },
    {
      name: 'clientAddress.neighborhood',
      label: 'Bairro',
      placeholder: 'Bairro',
      value: clientAddressWatch?.neighborhood ?? '',
    },
    {
      name: 'ieRg',
      label: 'RG',
      placeholder: 'IE/RG',
      value: ieRgWatch ?? '',
    },
    {
      name: 'email',
      label: 'Email',
      placeholder: 'E-mail',
      value: emailWatch ?? '',
    },
    {
      name: 'telephone',
      label: 'Telefone',
      placeholder: 'Telefone',
      value: telephoneWatch ?? '',
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
                  onChange={(e) => methods.setValue(field.name, e.target.value)}
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
