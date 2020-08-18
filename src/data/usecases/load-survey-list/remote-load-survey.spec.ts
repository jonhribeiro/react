import faker from 'faker'
import { HttpGetClientSpy } from '@/data/test'
import { RemoteLoadSurveyList } from './remote-load-survey-list'

describe('RemoteLoadSurveyList', () => {
    test('deve chamar HttpGetClient com url correto', async () => {
        const url = faker.internet.url()
        const httpGetClientSpy = new HttpGetClientSpy()
        const sut = new RemoteLoadSurveyList(url, httpGetClientSpy)
        await sut.loadAll()
        expect(httpGetClientSpy.url).toBe(url) 
    })
})