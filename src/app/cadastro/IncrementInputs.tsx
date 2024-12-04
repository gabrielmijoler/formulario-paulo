import { Controller, useFieldArray, useForm } from 'react-hook-form'

import { Box } from '@/components/Box'
import { TextAreaInput } from '@/components/TextInputArea'

export default function IncrementInputs() {
  const { control } = useForm()

  const { fields, append, remove } = useFieldArray({
    name: 'prescription',
    control,
  })

  return (
    <Box className="p-1 w-full">
      {fields?.map((field, index) => (
        <Box key={field.id}>
          <Controller
            name={`prescription.${index}.value`}
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextAreaInput
                {...field}
                label="relatório"
                value={value}
                onChangeValue={onChange}
                placeholder="digite o relatório"
              />
            )}
          />
          <button
            className="block p-2.5 rounded-lg bg-red-700 mt-2
          border-2 border-red-800 text-black w-24 hover:bg-red-400"
            onClick={() => remove(index)}
          >
            Remove
          </button>
        </Box>
      ))}
      <button
        className="block p-2.5 rounded-lg bg-gray-500 mt-2
            border-2 border-red-800 text-black w-24"
        onClick={() =>
          append({
            test: '',
          })
        }
      >
        ADD
      </button>
    </Box>
  )
}
