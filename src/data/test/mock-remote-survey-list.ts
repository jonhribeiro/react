import faker from 'faker'
import { RemoteLoadSurveyList } from '@/data/usecases'

export const mockRemoteSurveyModel = (): RemoteLoadSurveyList.Model => ({
    id: faker.random.uuid(),
    question: faker.random.words(10),
    diaAnswer: faker.random.boolean(),
    date: faker.date.recent().toISOString()
})

export const mockRemoteSurveyListModel = (): RemoteLoadSurveyList.Model[] => ([
    mockRemoteSurveyModel(),
    mockRemoteSurveyModel(),
    mockRemoteSurveyModel()
])
