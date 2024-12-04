'use client'

import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'

import { AddressProps, FormProps, schemaForm } from './schema'

export const UseCep = () => {
  const {
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm<FormProps>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schemaForm),

    defaultValues: {
      address: {
        zipCode: '',
        street: '',
        number: '',
        city: '',
        state: '',
        complement: '',
        district: '',
      },
    },
  })

  const watchZipCode = watch('address.zipCode')

  const handleSetData = useCallback(
    (data: AddressProps) => {
      setValue('address.city', data.address.localidade)
      setValue('address.street', data.address.logradouro)
      setValue('address.state', data.address.uf)
      setValue('address.district', data.address.bairro)
      setValue('address.complement', data.address.complemento)
    },
    [setValue],
  )

  const handleFetchAddress = useCallback(
    async (zipCode: string) => {
      const { data } = await axios.get(
        `https://viacep.com.br/ws/${zipCode}/json/`,
      )
      if (!data) return alert('Erro ao receber CEP')
      handleSetData(data)
    },
    [handleSetData],
  )

  useEffect(() => {
    setValue('address.zipCode', watchZipCode)

    if (watchZipCode.length !== 9) return

    handleFetchAddress(watchZipCode)
  }, [handleFetchAddress, watchZipCode, setValue])

  return {
    control,
    errors,
  }
}
