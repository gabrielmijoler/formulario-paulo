import { IClient } from '@/services/clients/types'
import { IPathologiesResponse } from '@/services/pathologies/types'
import { IQuestionResponse } from '@/services/questions/types'

export function clientsToOptions(clients: IClient[]) {
  return clients.map((item) => ({
    id: item.id,
    name: item.name,
    document: item.document,
    address: item.address,
    ieRg: item.ieRg,
    email: item.email,
    telephone: item.telephone,
  }))
}
export function optionsToQuestion(questions: IQuestionResponse[]) {
  return questions.map((item) => ({
    id: item.id,
    value: item.name,
    label: item.name,
  }))
}
export function pathologiesToOptions(pathologies: IPathologiesResponse[]) {
  return pathologies.map((item) => ({
    id: item.id,
    value: item.code,
    label: item.description,
  }))
}
