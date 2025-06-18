'use server'
import { requestApi } from '../request.api'
import { IQuestion, IQuestionResponse } from './types'

export async function postQuestion(
  params: IQuestion,
): Promise<IQuestionResponse> {
  return requestApi({
    url: 'https://clinical-backend-ae40133038af.herokuapp.com/v1/questions',
    method: 'POST',
    data: params,
  })
}

export async function getQuestion(): Promise<IQuestionResponse> {
  return requestApi({
    url: 'https://clinical-backend-ae40133038af.herokuapp.com/v1/questions',
    method: 'GET',
  })
}
export async function getQuestionsById(id: string): Promise<IQuestionResponse> {
  return requestApi({
    url: `https://clinical-backend-ae40133038af.herokuapp.com/v1/questions/${id}`,
    method: 'GET',
  })
}

export async function putQuestion(
  params: IQuestionResponse,
): Promise<IQuestionResponse> {
  return requestApi({
    url: 'https://clinical-backend-ae40133038af.herokuapp.com/v1/questions',
    method: 'PUT',
    data: params,
  })
}
