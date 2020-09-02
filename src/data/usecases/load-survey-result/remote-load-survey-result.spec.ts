import { HttpGetClientSpy } from '@/data/test'
import { RemoteLoadSurveyResult } from '@/data/usecases'
import faker from 'faker'

describe('RemoteLoadSurveyResult', () => {
  test('deve chamar HttpGetClient com url correto', async () => {
    const url = faker.internet.url()
    const httpGetClient = new HttpGetClientSpy()
    const sut = new RemoteLoadSurveyResult(url, httpGetClient)
    await sut.load()
    expect(httpGetClient.url).toBe(url)
  })
})
