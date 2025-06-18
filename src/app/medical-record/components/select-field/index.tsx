import React from 'react'
import {
  FormControl,
  InputLabel,
  MenuItem,
  ListItemText,
  SelectChangeEvent,
} from '@mui/material'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import Select from '@mui/material/Select'

interface SelectFieldProps<T> {
  name: string
  label: string
  control: Control<any>
  errors: FieldErrors<any>
  options: T[]
  value: any
  onChange: (event: SelectChangeEvent) => void
  getOptionLabel: (option: T) => string
  getOptionSecondary?: (option: T) => string
  getOptionValue: (option: T) => string | number
}

export function SelectField<T>({
  name,
  label,
  control,
  errors,
  options,
  value,
  onChange,
  getOptionLabel,
  getOptionSecondary,
  getOptionValue,
}: Readonly<SelectFieldProps<T>>) {
  const fieldError = errors[name]

  return (
    <>
      <FormControl className="w-full mb-4">
        <InputLabel id={`select-label-${name}`}>{label}</InputLabel>
        <Controller
          name={name}
          control={control}
          rules={{ required: 'Campo obrigatório' }}
          render={({ field }) => (
            <Select
              {...field}
              labelId={`select-label-${name}`}
              id={`select-${name}`}
              value={value || ''}
              label={label}
              onChange={onChange}
              error={!!fieldError}
            >
              {options.map((option) => (
                <MenuItem
                  key={getOptionValue(option)}
                  value={getOptionValue(option)}
                >
                  <ListItemText
                    primary={getOptionLabel(option)}
                    secondary={getOptionSecondary?.(option)}
                  />
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
      {fieldError && (
        <span className="text-red-500 text-sm mb-2 block">
          {(typeof fieldError?.message === 'string'
            ? fieldError.message
            : undefined) ?? 'Campo inválido'}
        </span>
      )}
    </>
  )
}
