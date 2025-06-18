'use client'

import { useEffect } from 'react'
import { getClientByID, putClient } from '@/services/clients'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { clientSchema } from '../../schema'
import { TextInput } from '@/components/TextInput'

interface ParamsID {
  params: { patientsId: string }
}

export default function PatientEdit({ params }: ParamsID) {
  const { patientsId } = params
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
  const formFields: Array<{
    name:
      | 'client.name'
      | 'client.document'
      | 'client.address'
      | 'client.ieRg'
      | 'client.email'
      | 'client.telephone'
    label: string
    placeholder: string
    value: string
  }> = [
    {
      name: 'client.name' as const,
      label: 'Nome',
      placeholder: 'Nome',
      value: clientWatch.name,
    },
    {
      name: 'client.document' as const,
      label: 'Documento',
      placeholder: 'Documento',
      value: clientWatch.document,
    },
    {
      name: 'client.address' as const,
      label: 'Endereço',
      placeholder: 'Endereço',
      value: clientWatch.address,
    },
    {
      name: 'client.ieRg' as const,
      label: 'RG',
      placeholder: 'IE/RG',
      value: clientWatch.ieRg,
    },
    {
      name: 'client.email' as const,
      label: 'Email',
      placeholder: 'E-mail',
      value: clientWatch.email,
    },
    {
      name: 'client.telephone' as const,
      label: 'Telefone',
      placeholder: 'Telefone',
      value: clientWatch.telephone,
    },
  ] as const

  return (
    <>
      {data && (
        <form onSubmit={methods.handleSubmit(onSubmit)} className="p-3">
          <h1>{patientsId}</h1>
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
                    methods.setValue(`${field.name}`, e.target.value)
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
