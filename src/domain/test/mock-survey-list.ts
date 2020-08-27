import faker from 'faker'
import { LoadSurveyList } from '@/domain/usercases'

export const mockSurveyModel = (): LoadSurveyList.Model => ({
    id: faker.random.uuid(),
    question: faker.random.words(10),
    diaAnswer: faker.random.boolean(),
    date: faker.date.recent()
})

export const mockSurveyListModel = (): LoadSurveyList.Model[] => ([
    mockSurveyModel(),
    mockSurveyModel(),
    mockSurveyModel()
])

export class LoadSurveyListSpy implements LoadSurveyList {
    callsCount = 0
    surveys = mockSurveyListModel()

    async loadAll (): Promise<LoadSurveyList.Model[]> {
        this.callsCount++
        return this.surveys
    }
}