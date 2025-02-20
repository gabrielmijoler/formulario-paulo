import { maskCPF } from '@/helpers/maskCep'
import { IClient, IGetClient } from '@/services/clients/types'
import { IPathologiesResponse } from '@/services/pathologies/types'

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
export const parsePatients = (subscriptions: IGetClient<IClient>): IClient[] =>
  subscriptions.data.map(parsePatient)

const parseTexts = (txt?: string | null) => txt ?? '-'

const parsePathologia = (data: IPathologiesResponse): IPathologiesResponse => {
  return {
    id: data?.id,
    code: parseTexts(data.code),
    description: parseTexts(data.description),
  }
}
export const parsePatholias = (
  subscriptions: IGetClient<IPathologiesResponse>,
): IPathologiesResponse[] => subscriptions.data.map(parsePathologia)
