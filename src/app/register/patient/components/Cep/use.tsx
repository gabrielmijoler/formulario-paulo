import { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { IClient } from '@/services/clients/types'
import { IViaCepResponse } from './types'

function viaCepToClientAddress(data: IViaCepResponse) {
  return {
    zipCode: data.cep ?? '',
    street: data.logradouro ?? '',
    number: '',
    city: data.localidade ?? '',
    state: data.uf ?? '',
    complement: data.complemento ?? '',
    neighborhood: data.bairro ?? '',
  }
}

export const useCep = () => {
  const { watch, setValue } = useFormContext<IClient>()
  const watchZipCode = watch('clientAddress.zipCode')

  const fetchAddress = async (zipCode: string) => {
    const { data } = await axios.get(
      `https://viacep.com.br/ws/${zipCode}/json/`,
    )
    return viaCepToClientAddress(data)
  }

  const { data: cepData } = useQuery({
    queryKey: ['cep', watchZipCode],
    queryFn: () => fetchAddress(watchZipCode),
    enabled: !!watchZipCode && watchZipCode.length === 8,
    staleTime: 1000 * 60 * 5,
  })

  useEffect(() => {
    if (cepData) {
      setValue('clientAddress.city', cepData.city)
      setValue('clientAddress.street', cepData.street)
      setValue('clientAddress.state', cepData.state)
      setValue('clientAddress.neighborhood', cepData.neighborhood)
      setValue('clientAddress.complement', cepData.complement)
    }
  }, [cepData, setValue])
}