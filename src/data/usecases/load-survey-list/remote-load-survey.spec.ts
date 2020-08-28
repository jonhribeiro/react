import faker from 'faker'
import { HttpGetClientSpy, mockRemoteSurveyListModel } from '@/data/test'
import { RemoteLoadSurveyList } from './remote-load-survey-list'
import { UnexpectedError } from '@/domain/errors'
import { HttpStatusCode } from '@/data/protocols/http'

type SutTypes = {
    sut: RemoteLoadSurveyList
    httpGetClientSpy: HttpGetClientSpy<RemoteLoadSurveyList.Model[]>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
    const httpGetClientSpy = new HttpGetClientSpy<RemoteLoadSurveyList.Model[]>()
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
        const httpResult = mockRemoteSurveyListModel()
        httpGetClientSpy.response = {
          statusCode: HttpStatusCode.ok,
          body: httpResult
        }
        const surveyList = await sut.loadAll()
        expect(surveyList).toEqual([{
          id: httpResult[0].id,
          question: httpResult[0].question,
          diaAnswer: httpResult[0].diaAnswer,
          date: new Date(httpResult[0].date)
        }, {
          id: httpResult[1].id,
          question: httpResult[1].question,
          diaAnswer: httpResult[1].diaAnswer,
          date: new Date(httpResult[1].date)
        }, {
          id: httpResult[2].id,
          question: httpResult[2].question,
          diaAnswer: httpResult[2].diaAnswer,
          date: new Date(httpResult[2].date)
        },
      ])
    })

    test('deve retornar uma lista vazia e httpGetClientSpy retornar erro 204', async () => {
        const { sut, httpGetClientSpy } = makeSut()
        httpGetClientSpy.response = {
          statusCode: HttpStatusCode.noContent
        }
        const surveyList = await sut.loadAll()
        expect(surveyList).toEqual([])
    })
})