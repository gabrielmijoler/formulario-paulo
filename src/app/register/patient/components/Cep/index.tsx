'use client'

import { Controller, useFormContext } from 'react-hook-form'
import { TextInput } from '@/components/TextInput'
import { FPBox } from '@/components/Box'
import { IClient } from '@/services/clients/types'
import { useCep } from './use'
import { ErrorMessage } from '@/components/ErrorMessage'

export default function Cep() {
  const { control, formState: { errors } } = useFormContext<IClient>()
  useCep()

  return (
    <FPBox width="full">
      <FPBox direction="row" gap="1">
        <FPBox width="1/2">
          <Controller
            name="clientAddress.zipCode"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                value={field.value}
                onChange={field.onChange}
                placeholder="CEP"
                maxLength={8}
              />
            )}
          />
          {errors.clientAddress?.zipCode?.message && (
            <ErrorMessage message={errors.clientAddress?.zipCode.message} />
          )}
        </FPBox>
        <FPBox width="1/2">
          <Controller
            name="clientAddress.number"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                value={field.value}
                onChange={field.onChange}
                placeholder="Número"
              />
            )}
          />
          {errors.clientAddress?.number?.message && (
            <ErrorMessage message={errors.clientAddress?.number?.message} />
          )}
        </FPBox>
      </FPBox>
      <FPBox>
        <Controller
          name="clientAddress.street"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              value={field.value}
              onChange={field.onChange}
              placeholder="Rua"
            />
          )}
        />

        {errors.clientAddress?.street?.message && (
          <ErrorMessage message={errors.clientAddress?.street?.message} />
        )}
      </FPBox>
      <FPBox>
        <Controller
          name="clientAddress.neighborhood"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              value={field.value}
              onChange={field.onChange}
              placeholder="Bairro"
            />
          )}
        />
        {errors.clientAddress?.neighborhood?.message && (
          <ErrorMessage message={errors.clientAddress?.neighborhood?.message} />
        )}
      </FPBox>
      <FPBox>
        <Controller
          name="clientAddress.state"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              width="50"
              value={field.value}
              onChange={field.onChange}
              placeholder="UF"
            />
          )}
        />
        {errors.clientAddress?.state?.message && (
          <ErrorMessage message={errors.clientAddress?.state?.message} />
        )}
      </FPBox>
      <Controller
        name="clientAddress.city"
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            width="50"
            value={field.value}
            onChange={field.onChange}
            placeholder="Cidade"
          />
        )}
      />
      {errors.clientAddress?.city?.message && (
        <ErrorMessage message={errors.clientAddress?.city?.message} />
      )}
      <FPBox>
        <Controller
          name="clientAddress.complement"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              value={field.value}
              onChange={field.onChange}
              placeholder="Complemento"
            />
          )}
        />
        {errors.clientAddress?.complement?.message && (
          <ErrorMessage message={errors.clientAddress?.complement?.message} />
        )}
      </FPBox>
    </FPBox>
  )
}

