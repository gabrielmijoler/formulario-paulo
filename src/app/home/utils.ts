import { maskCPF } from '@/helpers/maskCep'
import { IClient, IGetResponse } from '@/services/clients/types'
import { IPathologiesResponse } from '@/services/pathologies/types'
import { IQuestionResponse } from '@/services/questions/types'

const parseTexts = (txt?: string | null) => txt ?? '-'
const parsePatient = (data: IClient): IClient => {
  return {
    id: data?.id,
    name: parseTexts(data.name),
    email: parseTexts(data.email),
    ieRg: maskCPF(data.ieRg) ?? '-',
    document: parseTexts(data.document),
    clientAddress: data.clientAddress,
    telephone: parseTexts(data.telephone),
  }
}
export const parsePatients = (
  subscriptions: IGetResponse<IClient> | undefined,
): IClient[] => subscriptions?.data!.map(parsePatient) ?? []

const parsePathologies = (data: IPathologiesResponse): IPathologiesResponse => {
  return {
    id: data?.id,
    code: parseTexts(data.code),
    description: parseTexts(data.description),
  }
}
export const parsePathologiesGetResponse = (
  subscriptions: IGetResponse<IPathologiesResponse> | undefined,
): IPathologiesResponse[] => subscriptions?.data!.map(parsePathologies) ?? []

const parseQuestion = (data: IQuestionResponse): IQuestionResponse => {
  return {
    name: parseTexts(data.name),
    response: parseTexts(data.response),
    id: data.id,
  }
}
export const parseQuestions = (
  subscriptions: IGetResponse<IQuestionResponse>,
): IQuestionResponse[] => subscriptions.data!.map(parseQuestion)
