'use client'

import Select from 'react-select'
import { useEffect, useState } from 'react'
import { SelectInputProps } from './type'

export function SelectInput({
  placeholder = 'Selecione...',
  label,
  isMulti,
  options,
  isClearable = false,
  width,
  name,
  noOptionsMessage = () => 'Nenhuma opção encontrada',
}: SelectInputProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const formatGroupLabel = (data: any) => (
    <div className="flex items-center justify-between rounded-full w-full">
      <span>{label}</span>
      <span className="bg-gray-200 !active:bg-amber-700 hover:bg-amber-700 rounded-full text-gray-800 text-xs font-normal leading-none min-w-1 py-1 px-2 text-center">
        {data.options.length}
      </span>
    </div>
  )

  if (!isClient) {
    return null
  }

  if (isMulti) {
    return (
      <Select
        name={name}
        className="rounded-full mt-4 w-full text-black"
        options={options}
        onChange={(e) => e?.values}
        formatGroupLabel={formatGroupLabel}
        placeholder={placeholder}
        hideSelectedOptions={false}
        isMulti={isMulti}
        noOptionsMessage={noOptionsMessage}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: 'blue',
            neutral40: 'blue',
          },
        })}
        isClearable={isClearable}
      />
    )
  }

  return (
    <Select
      className={`rounded-lg mt-4 ${width ? `w-${width}` : 'w-full'}  text-black`}
      options={options}
      onChange={(e) => e?.value}
      formatGroupLabel={formatGroupLabel}
      placeholder={placeholder}
      hideSelectedOptions={false}
      noOptionsMessage={noOptionsMessage}
      isClearable={isClearable}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: state.isFocused ? 'white' : '#e5e7eb',
        }),
      }}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: 'blue',
          neutral40: 'blue',
        },
      })}
    />
  )
}
