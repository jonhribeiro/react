export type RemoteSurveyResultModel = {
  question: string
  date: string
  answers: RemoteSurveyResultanswerModel[]
}
export type RemoteSurveyResultanswerModel = {
  image?: string
  answer: string
  count: number
  percent: number
  isCurrentAccountAnswer: boolean
}
