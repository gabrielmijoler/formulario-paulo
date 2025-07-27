'use client'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { CloseIcon } from '@/components/icons'
import { ModalBase } from '@/components/ModalBase'
import { Text } from '@/components/Text'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { IQuestionResponse } from '@/services/questions/types'

type IModalQuestion = {
  control: any
  errors: any
  optionsQuestion?: {
    id: number
    value: string
  }[]
  questionsWatch: any
  setValue: any
  modalOpen: boolean
  handleModal: () => void
  onSave?: (questionsWithResponses: IQuestionResponse[]) => void
  questionData?: IQuestionResponse[]
}
export const ModalQuestion = ({
  control,
  errors,
  optionsQuestion,
  questionsWatch,
  setValue,
  modalOpen,
  handleModal,
  onSave
}: IModalQuestion) => {
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([])
  const [responses, setResponses] = useState<Record<number, string>>({})

  const handleSelectChange = (
    event: SelectChangeEvent<typeof selectedQuestions>,
  ) => {
    const {
      target: { value },
    } = event
    setSelectedQuestions(typeof value === 'string' ? value.split(',') : value)
    setValue(
      'questions',
      selectedQuestions.map((item) => {
        const question = optionsQuestion!.find((q) => q.id === parseInt(item))
        return {
          id: question?.id ?? '',
          name: question?.value ?? '',
        }
      }),
    )
  }
  const questionsWithResponses = selectedQuestions.map((item) => {
    const question = optionsQuestion!.find((q) => q.id === Number(item))
    return {
      id: question?.id ?? Number(item),
      name: question?.value ?? '',
      response: responses[Number(item)] ?? '',
    }
  })
  return (
    <ModalBase
      bgOpacity
      height="h-auto"
      width="w-3/4"
      isOpen={modalOpen}
      className="min-h-72"
      onClose={handleModal}
    >
      <div className="p-2 bg-amber-200 flex flex-row justify-between items-center">
        <Text as="h1" fontSize="xl">
          Selecionar as perguntas
        </Text>
        <button onClick={handleModal} className="p-1">
          <CloseIcon />
        </button>
      </div>
      <hr className="w-full border-black box-border mb-2" />

      <FormControl className="w-full">
        <InputLabel id="select-label-question">Perguntas</InputLabel>
        <Controller
          name="questions"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              multiple
              labelId="select-label-question"
              id="select-label-questions"
              label="Perguntas"
              className="w-full bg-slate-200"
              value={selectedQuestions}
              onChange={(event) => {
                const {
                  target: { value },
                } = event
                setSelectedQuestions(typeof value === 'string' ? value.split(',') : value)
                field.onChange(typeof value === 'string' ? value.split(',') : value)
              }}
              renderValue={(selected) =>
                optionsQuestion
                  ?.filter((option) => selected.includes(String(option.id)))
                  .map((option) => option.value)
                  .join(', ')
              }
            >
              {optionsQuestion?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
      {errors.questions && <span>Campo obrigatório</span>}
      {selectedQuestions.length > 0 &&
        questionsWatch.length > 0 &&
        questionsWatch.map((item: number) => {
          return (
            <div
              className="grid grid-flow-row w-full gap-4 p-2 text-black"
              key={item}
            >
              <h5>Pergunta</h5>
              <input
                key={item}
                type="text"
                value={
                  optionsQuestion!.find((value) => value.id === item)?.value
                }
                disabled
                className=" border p-2 rounded bg-gray-100 disabled:bg-slate-300"
              />
              <h5>Resposta</h5>
              <input
                type="text"
                value={responses[item] ?? ''}
                onChange={(e) =>
                  setResponses((prev) => ({
                    ...prev,
                    [item]: e.target.value,
                  }))
                }
                className="border p-2 rounded bg-gray-100"
              />
            </div>
          )
        })}

      <div className="flex justify-end gap-2 mt-4 m-2">
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleModal}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            onSave && onSave(questionsWithResponses)
          }}
        >
          Salvar
        </Button>
      </div>
    </ModalBase>
  )
}
