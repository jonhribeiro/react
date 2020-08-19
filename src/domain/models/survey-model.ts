export type SurveyModel = {
    id: string
    question: string
    answers: SurveyAnswerModel[]
    date: Date
    diaAnswer: boolean
}

export type SurveyAnswerModel = {
    image?: string
    answer: string
}