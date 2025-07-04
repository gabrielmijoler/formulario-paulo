'use server'
import { IGetPagination, IGetResponse } from '../clients/types'
import { requestApi } from '../request.api'
import { IQuestion, IQuestionResponse } from './types'

export async function postQuestion(
  params: IQuestionResponse[],
): Promise<IQuestionResponse> {
  return requestApi({
    url: `${process.env.NEXT_PUBLIC_CLINICAL_BASE_URL}/questions`,
    method: 'POST',
    data: params,
  })
}

export async function getQuestion(
  params: IGetPagination,
): Promise<IGetResponse<IQuestionResponse>> {
  return requestApi({
    url: `${process.env.NEXT_PUBLIC_CLINICAL_BASE_URL}/questions`,
    method: 'GET',
    params,
  })
}

export async function getQuestions(
  params: IGetPagination,
): Promise<IGetResponse<IQuestionResponse>> {
  return requestApi({
    url: `${process.env.NEXT_PUBLIC_CLINICAL_BASE_URL}/questions`,
    method: 'GET',
    params,
  })
}
export async function getQuestionsById(id: string): Promise<IQuestionResponse> {
  return requestApi({
    url: `${process.env.NEXT_PUBLIC_CLINICAL_BASE_URL}questions/${id}`,
    method: 'GET',
  })
}

export async function putQuestion(
  params: IQuestionResponse,
): Promise<IQuestionResponse> {
  return requestApi({
    url: `${process.env.NEXT_PUBLIC_CLINICAL_BASE_URL}/questions`,
    method: 'PUT',
    data: params,
  })
}
