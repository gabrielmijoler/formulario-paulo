import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { CloseIcon } from '@/components/icons'
import { ModalBase } from '@/components/ModalBase'
import { Text } from '@/components/Text'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'

type IModalQuestion = {
  control: any
  errors: any
  optionsQuestion: {
    id: number
    value: string
    label: string
  }[]
  QuestionsWatch: any
  setValue: any
  modalOpen: boolean
  handleModal: () => void
}
export const ModalQuestion = ({
  control,
  errors,
  optionsQuestion,
  QuestionsWatch,
  setValue,
  modalOpen,
  handleModal,
}: IModalQuestion) => {
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([])
  const [response, setResponse] = useState('')

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
        const question = optionsQuestion.find((q) => q.id === parseInt(item))
        return {
          id: question?.id ?? '',
          name: question?.label ?? '',
        }
      }),
    )
  }

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
          render={({ field }) => {
            return (
              <Select
                {...field}
                multiple
                labelId="select-label-question"
                id="select-label-quetions"
                label="Perguntas"
                className="w-full bg-slate-200"
                value={selectedQuestions}
                onChange={(event) => {
                  handleSelectChange(event)
                  field.onChange(event)
                }}
              >
                {optionsQuestion.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            )
          }}
        />
      </FormControl>
      {errors.questions && <span>Campo obrigatório</span>}

      {selectedQuestions.length > 0 &&
        QuestionsWatch.length > 0 &&
        QuestionsWatch.map((item: number) => {
          console.log(item)
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
                  optionsQuestion.find((value) => value.id === item)?.label
                }
                disabled
                className=" border p-2 rounded bg-gray-100 disabled:bg-slate-300"
              />
              <h5>Resposta</h5>
              <input
                type="text"
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                className=" border p-2 rounded bg-gray-100 "
              />
            </div>
          )
        })}
    </ModalBase>
  )
}
