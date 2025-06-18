'use client'

import { Controller } from 'react-hook-form'
import { TextInput } from '@/components/TextInput'
import { UseCep } from './use'
import { FPBox } from '@/components/Box'

export default function Cep() {
  const { errors, control } = UseCep()
  const ErrorMessage = ({ message }: { message: string }) => {
    return message ? <p className="text-red-400">{message}</p> : null
  }

  return (
    <FPBox width="full">
      <FPBox direction="row" gap="1">
        <FPBox width="1/2">
          <Controller
            name="address.zipCode"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                value={field.value}
                onChange={field.onChange}
                placeholder="CEP"
                maxLength={9}
              />
            )}
          />
          {errors.address?.zipCode?.message && (
            <ErrorMessage message={errors.address?.zipCode?.message} />
          )}
        </FPBox>
        <FPBox width="1/2">
          <Controller
            name="address.number"
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
          {errors.address?.number?.message && (
            <ErrorMessage message={errors.address?.number?.message} />
          )}
        </FPBox>
      </FPBox>
      <FPBox>
        <Controller
          name="address.street"
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

        {errors.address?.street?.message && (
          <ErrorMessage message={errors.address?.street?.message} />
        )}
      </FPBox>
      <FPBox>
        <Controller
          name="address.district"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              value={field.value}
              onChange={field.onChange}
              placeholder="Estado"
            />
          )}
        />
        {errors.address?.district?.message && (
          <ErrorMessage message={errors.address?.district?.message} />
        )}
      </FPBox>
      <FPBox>
        <Controller
          name="address.state"
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
        {errors.address?.state?.message && (
          <ErrorMessage message={errors.address?.state?.message} />
        )}
      </FPBox>
      <Controller
        name="address.city"
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
      {errors.address?.city?.message && (
        <ErrorMessage message={errors.address?.city?.message} />
      )}
      <FPBox>
        <Controller
          name="address.complement"
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
        {errors.address?.complement?.message && (
          <ErrorMessage message={errors.address?.complement?.message} />
        )}
      </FPBox>
    </FPBox>
  )
}

// {
//     criteriaMode: 'all',
//     defaultValues: {
//       name: '',
//       address: '',
//       email: '',
//       cpf: '',
//       rg: '',
//       dateBourn: '',
//       obsAboutPatient: '',
//     },
//   }
