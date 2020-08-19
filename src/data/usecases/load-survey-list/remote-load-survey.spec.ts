import faker from 'faker'
import { HttpGetClientSpy } from '@/data/test'
import { RemoteLoadSurveyList } from './remote-load-survey-list'
import { UnexpectedError } from '@/domain/errors'
import { HttpStatusCode } from '@/data/protocols/http'
import { SurveyModel } from '@/domain/models'
import { mockSurveyListModel } from '@/domain/test'

type SutTypes = {
    sut: RemoteLoadSurveyList
    httpGetClientSpy: HttpGetClientSpy<SurveyModel[]>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
    const httpGetClientSpy = new HttpGetClientSpy<SurveyModel[]>()
    const sut = new RemoteLoadSurveyList(url, httpGetClientSpy)
    return {
        sut,
        httpGetClientSpy
    }
}

describe('RemoteLoadSurveyList', () => {
    test('deve chamar HttpGetClient com url correto', async () => {
        const url = faker.internet.url()
        const { sut, httpGetClientSpy } = makeSut(url)
        await sut.loadAll()
        expect(httpGetClientSpy.url).toBe(url) 
    })
    
    test('deve mostra UnexpectedError erro 403', async () => {
        const { sut, httpGetClientSpy } = makeSut()
        httpGetClientSpy.response = {
          statusCode: HttpStatusCode.forbidden
        }
        const promise = sut.loadAll()
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })
    
    test('deve mostra UnexpectedError erro 404', async () => {
        const { sut, httpGetClientSpy } = makeSut()
        httpGetClientSpy.response = {
          statusCode: HttpStatusCode.notFound
        }
        const promise = sut.loadAll()
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })
    
    test('deve mostra UnexpectedError erro 500', async () => {
        const { sut, httpGetClientSpy } = makeSut()
        httpGetClientSpy.response = {
          statusCode: HttpStatusCode.serverError
        }
        const promise = sut.loadAll()
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('deve retornar uma lista index e httpGetClientSpy retornar 200 caso de sucesso', async () => {
        const { sut, httpGetClientSpy } = makeSut()
        const httResult = mockSurveyListModel()
        httpGetClientSpy.response = {
          statusCode: HttpStatusCode.ok,
          body: httResult
        }
        const surveyList = await sut.loadAll()
        expect(surveyList).toEqual(httResult)
      })
})