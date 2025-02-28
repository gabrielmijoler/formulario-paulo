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
    address: parseTexts(data.address),
    telephone: parseTexts(data.telephone),
    isOpen: data?.isOpen ?? false,
  }
}
export const parsePatients = (
  subscriptions: IGetResponse<IClient>,
): IClient[] => subscriptions.data.map(parsePatient)

const parsePathologia = (data: IPathologiesResponse): IPathologiesResponse => {
  return {
    id: data?.id,
    code: parseTexts(data.code),
    description: parseTexts(data.description),
  }
}
export const parsePatholias = (
  subscriptions: IGetResponse<IPathologiesResponse>,
): IPathologiesResponse[] => subscriptions.data.map(parsePathologia)

const parseQuestion = (data: IQuestionResponse): IQuestionResponse => {
  return {
    id: data?.id,
    name: parseTexts(data.name),
    response: parseTexts(data.response),
  }
}
export const parseQuestions = (
  subscriptions: IGetResponse<IQuestionResponse>,
): IQuestionResponse[] => subscriptions.data.map(parseQuestion)
