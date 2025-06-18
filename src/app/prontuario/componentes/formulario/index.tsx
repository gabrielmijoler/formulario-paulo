import clsx from 'clsx'
import {
  Control,
  Controller,
  FieldErrors,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormSetValue,
} from 'react-hook-form'
import Select from 'react-select/base'
import {
  FormControl,
  InputLabel,
  MenuItem,
  ListItemText,
  SelectChangeEvent,
} from '@mui/material'
import { SelectInput } from '@/components/Select'
import { TextAreaInput } from '@/components/TextInputArea'
import { ModalQuestion } from '../ModalQuestion'
import { Text } from '@/components/Text'
import { IClient } from '@/services/clients/types'
import { IPathologiesResponse } from '@/services/pathologies/types'
type FormularioProps = {
  control: Control<any>
  errors: FieldErrors<any>
  handleSubmit: UseFormHandleSubmit<any>
  onSubmit: (data: any) => void
  optionsClient: IClient[]
  optionsPathologies: IPathologiesResponse
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
  getValues: UseFormGetValues<any>
  setIsContentSelected: (value: boolean) => void
}
export function Formulario({
  control,
  errors,
  handleSubmit,
  onSubmit,
  optionsClient,
  optionsPathologies,
  optionsQuestion,
  clientWatch,
  QuestionsWatch,
  setValue,
  handleModal,
  isContentSelected,
  modalOpen,
  onChangeClient,
  getValues,
}: FormularioProps) {
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
            <>
              <Select
                {...field}
                labelId="select-label-clients"
                id="select-label-clients"
                value={getValues(field.name).id as any}
                label="Paciente"
                onChange={onChangeClient}
              >
                {optionsClient.map((option, index) => (
                  <MenuItem key={index} value={option.id}>
                    <ListItemText
                      primary={option.name}
                      secondary={option.email}
                    />
                  </MenuItem>
                ))}
              </Select>
            </>
          )}
        />
      </FormControl>
      {errors.clientId && <span>Campo obrigatório</span>}

      {isContentSelected && (
        <div className="grid grid-cols-2 gap-4 text-black mt-4">
          <input
            name="client.name"
            type="text"
            value={clientWatch.name}
            disabled
            placeholder="Nome"
            className="p-2 rounded disabled:bg-gray-400"
          />
          <input
            type="text"
            value={clientWatch.document}
            disabled
            placeholder="Documento"
            className="p-2 rounded disabled:bg-gray-400"
          />
          <input
            type="text"
            value={clientWatch.address}
            disabled
            placeholder="Endereço"
            className="p-2 rounded disabled:bg-gray-400"
          />
          <input
            type="text"
            value={clientWatch.ieRg}
            disabled
            placeholder="IE/RG"
            className="p-2 rounded disabled:bg-gray-400"
          />
          <input
            type="text"
            value={clientWatch.email}
            disabled
            placeholder="E-mail"
            className="p-2 rounded disabled:bg-gray-400"
          />
          <input
            type="text"
            value={clientWatch.telephone}
            disabled
            placeholder="Telefone"
            className="p-2 rounded disabled:bg-gray-400"
          />
        </div>
      )}
      <Controller
        name="pathologies"
        control={control}
        render={({ field }) => (
          <SelectInput
            {...field}
            isMulti
            className="w-full bg-slate-200"
            options={optionsPathologies}
            placeholder="Selecione as patologias"
            value={optionsPathologies.filter(() => field.value)}
            getOptionValue={(option) => option.id.toString()}
            getOptionLabel={(option) => option.label}
            onChange={(selected) =>
              field.onChange(
                selected.map((option: { value: any }) => option.value),
              )
            }
          />
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
      <Controller
        name="symptoms"
        control={control}
        render={({ field }) => (
          <TextAreaInput
            {...field}
            value={field.value}
            onChange={field.onChange}
            placeholder="Digite a conclusão"
          />
        )}
      />
      {errors.symptoms && <span>Campo obrigatório</span>}
      <Controller
        name="clinicalExam"
        control={control}
        render={({ field }) => (
          <TextAreaInput
            {...field}
            value={field.value}
            onChange={field.onChange}
            placeholder="Digite a conclusão"
          />
        )}
      />
      {errors.clinicalExam && <span>Campo obrigatório</span>}

      <Controller
        name="completeClinicalExam"
        control={control}
        render={({ field }) => (
          <TextAreaInput
            {...field}
            type="text"
            value={field.value}
            onChange={field.onChange}
            placeholder="Digite o nome"
          />
        )}
      />
      {errors.completeClinicalExam && <span>Campo obrigatório</span>}
      <Controller
        name="conclusion"
        control={control}
        render={({ field }) => (
          <TextAreaInput
            {...field}
            value={field.value}
            onChange={field.onChange}
            placeholder="Digite o seu conclusion"
          />
        )}
      />
      {errors.conclusion && <span>Campo obrigatório</span>}
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
