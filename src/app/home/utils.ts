import { maskCPF } from "@/helpers/maskCep"
import { IClient, IGetClient } from "@/services/clients/types"

const parseTexts = (txt?: string | null) => txt ?? '-'

const parseSubscription = (data: IClient): IClient => {
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
export const parseSubscriptions = (subscriptions: IGetClient): IClient[] =>
  subscriptions.data.map(parseSubscription)
