import clsx from 'clsx'
import {
  Control,
  Controller,
  FieldErrors,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormSetValue,
} from 'react-hook-form'
import {
  FormControl,
  InputLabel,
  MenuItem,
  ListItemText,
  SelectChangeEvent,
} from '@mui/material'
import { ModalQuestion } from '../modal-question'
import { Text } from '@/components/Text'
import { IClient } from '@/services/clients/types'
import { IPathologiesResponse } from '@/services/pathologies/types'
import Select from '@mui/material/Select'

type FormProps = Readonly<{
  control: Control<any>
  errors: FieldErrors<any>
  handleSubmit: UseFormHandleSubmit<any>
  onSubmit: (data: any) => void
  optionsClient: IClient[]
  optionsPathologies: IPathologiesResponse[]
  optionsQuestion: {
    id: number
    value: string
    label: string
  }[]
  clientWatch: any
  QuestionsWatch: any
  setValue: UseFormSetValue<any>
  handleModal: () => void
  isContentSelected: boolean
  modalOpen: boolean
  onChangeClient: (event: SelectChangeEvent) => void
  onChangePathologies: (event: SelectChangeEvent) => void
  getValues: UseFormGetValues<any>
  setIsContentSelected: (value: boolean) => void
}>
export function Form({
  control,
  errors,
  handleSubmit,
  onSubmit,
  optionsClient,
  optionsQuestion,
  optionsPathologies,
  clientWatch,
  QuestionsWatch,
  setValue,
  handleModal,
  isContentSelected,
  modalOpen,
  onChangeClient,
  onChangePathologies,
  getValues,
}: FormProps) {
  const disabledFields = [
    { name: 'client.name', value: clientWatch.name, placeholder: 'Nome' },
    {
      name: 'client.document',
      value: clientWatch.document,
      placeholder: 'Documento',
    },
    {
      name: 'client.address',
      value: clientWatch.address,
      placeholder: 'Endereço',
    },
    { name: 'client.ieRg', value: clientWatch.ieRg, placeholder: 'IE/RG' },
    { name: 'client.email', value: clientWatch.email, placeholder: 'E-mail' },
    {
      name: 'client.telephone',
      value: clientWatch.telephone,
      placeholder: 'Telefone',
    },
  ]
  return (
    <form className="p-1" onSubmit={handleSubmit(onSubmit)}>
      <Text fontSize="xl">Prontuario</Text>
      <hr className="w-full border-black box-border mb-8" />
      <FormControl className="w-full">
        <InputLabel id="select-label-clients">Paciente</InputLabel>
        <Controller
          name="client"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              labelId="select-label-clients"
              id="select-label-clients"
              value={getValues(field.name).id}
              label="Paciente"
              onChange={onChangeClient}
            >
              {optionsClient.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  <ListItemText
                    primary={option.name}
                    secondary={option.email}
                  />
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
      {errors.clientId && <span>Campo obrigatório</span>}

      {isContentSelected && (
        <div className="grid grid-cols-2 gap-4 text-black mt-4">
          {disabledFields.map((field) => (
            <input
              key={field.name}
              name={field.name}
              type="text"
              value={field.value}
              disabled
              placeholder={field.placeholder}
              className="p-2 rounded disabled:bg-gray-400"
            />
          ))}
        </div>
      )}
      <Controller
        name="pathologies"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            labelId="select-label-pathologies"
            id="select-label-pathologies"
            value={getValues(field.name).id}
            label="Patologias"
            onChange={onChangePathologies}
          >
            {optionsPathologies.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                <ListItemText
                  primary={option.code}
                  secondary={option.description}
                />
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {errors.pathologies && <span>Campo obrigatório</span>}
      <button
        onClick={handleModal}
        className="w-48 h-10 my-3 rounded-2xl bg-amber-500 text-black"
      >
        Adicionar perguntas
      </button>
      <ModalQuestion
        control={control}
        errors={errors}
        optionsQuestion={optionsQuestion}
        QuestionsWatch={QuestionsWatch}
        setValue={setValue}
        modalOpen={modalOpen}
        handleModal={handleModal}
      />

      <button
        className="px-4 py-3 rounded-lg bg-gray-200 mt-4
        border-2 focus:border-blue-500 focus:bg-white
        focus:outline-none text-black w-full"
        type="submit"
      >
        Cadastrar Prontuario
      </button>
      <button
        className={clsx(
          'px-4 py-3 rounded-lg',
          isContentSelected ? 'bg-blue-500' : 'bg-gray-200',
        )}
      >
        Cadastrar Prontuario
      </button>
    </form>
  )
}
