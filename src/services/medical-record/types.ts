export type IClientMedicalRecord = {
  name: string
  document: string
  address: string
  ieRg: string
  email: string
  telephone: number
}
export type IMedicalRecordPathology = {
  pathologiesId: number
}

export type IMedicalRecordQuestion = {
  questionId: number
}

export type ITreatment = {
  description: string
  medicalRecordId: number
}

export type IFeedback = {
  description: string
}

export type IMedicalRecordRequest = {
  symptoms: string
  clinicalExam: string
  completeClinicalExam: string
  conclusion: string
  clientId: number
  userId: number
  status: string
  client: IClientMedicalRecord
  medicalRecordPathologies: IMedicalRecordPathology
  medicalRecordQuestions: IMedicalRecordQuestion
  treatments: ITreatment[]
}

export type IMedicalRecordResponse = {
  id: number
  calendarGoogleId: string
  symptoms: string
  clinicalExam: string
  completeClinicalExam: string
  conclusion: string
  clientId: number
  userId: number
  status: string
  client: IClientMedicalRecord
  medicalRecordPathologies: IMedicalRecordPathology[]
  medicalRecordQuestions: IMedicalRecordQuestion[]
  treatments: ITreatment[]
  feedbacks: IFeedback[]
  createdAt: string
  updatedAt: string
}
