export type IMedicalRecordRequest = {
  calendarGoogleId: string
  symptoms: string
  clinicalExam: string
  completeClinicalExam: string
  conclusion: string
  clientId: number
  userId: number
  status: string
  client: {
    name: string
    document: string
    address: string
    ieRg: string
    email: string
    telephone: number
  }
  medicalRecordPathologies: [
    {
      pathologiesId: number
    },
  ]
  medicalRecordQuestions: [
    {
      questionId: number
    },
  ]
  treatments: [
    {
      description: string
      medicalRecordId: number
    },
  ]
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
  client: {
    name: string
    document: string
    address: string
    ieRg: string
    email: string
    telephone: number
  }
  medicalRecordPathologies: [
    {
      pathologiesId: number
    },
  ]
  medicalRecordQuestions: [
    {
      questionId: number
    },
  ]
  pathologies: [
    {
      code: string
      description: string
    },
  ]
  questions: [
    {
      name: string
      response: string
    },
  ]
  treatments: [
    {
      description: string
      medicalRecordId: number
    },
  ]
  feedbacks: [
    {
      description: string
    },
  ]
  createdAt: string
  updatedAt: string
}
