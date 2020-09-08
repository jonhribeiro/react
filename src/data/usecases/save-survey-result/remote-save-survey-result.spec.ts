import { HttpClientSpy, mockRemoteSurveyResultModel } from '@/data/test'
import { RemoteSaveSurveyResult } from '@/data/usecases'
import { HttpStatusCode } from '@/data/protocols/http'
// import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import faker from 'faker'

type SutTypes = {
  sut: RemoteSaveSurveyResult
  httpClientSpy: HttpClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteSaveSurveyResult(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteSaveSurveyResult', () => {
  test('deve chamar HttpGetClient com url correto', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockRemoteSurveyResultModel()
    }
    await sut.save({ answer: faker.random.word() })
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('put')
  })

  //   test('deve mostra AccessDeniedError erro 403', async () => {
  //     const { sut, httpClientSpy } = makeSut()
  //     httpClientSpy.response = {
  //       statusCode: HttpStatusCode.forbidden
  //     }
  //     const promise = sut.load()
  //     await expect(promise).rejects.toThrow(new AccessDeniedError())
  //   })

  //   test('deve mostra UnexpectedError erro 404', async () => {
  //     const { sut, httpClientSpy } = makeSut()
  //     httpClientSpy.response = {
  //       statusCode: HttpStatusCode.notFound
  //     }
  //     const promise = sut.load()
  //     await expect(promise).rejects.toThrow(new UnexpectedError())
  //   })

  //   test('deve mostra UnexpectedError erro 500', async () => {
  //     const { sut, httpClientSpy } = makeSut()
  //     httpClientSpy.response = {
  //       statusCode: HttpStatusCode.serverError
  //     }
  //     const promise = sut.load()
  //     await expect(promise).rejects.toThrow(new UnexpectedError())
  //   })

//   test('deve retornar uma lista index e httpClientSpy retornar 200 caso de sucesso', async () => {
//     const { sut, httpClientSpy } = makeSut()
//     const httpResult = mockRemoteSurveyResultModel()
//     httpClientSpy.response = {
//       statusCode: HttpStatusCode.ok,
//       body: httpResult
//     }
//     const surveyList = await sut.load()
//     expect(surveyList).toEqual({
//       question: httpResult.question,
//       answers: httpResult.answers,
//       date: new Date(httpResult.date)
//     })
//   })
})
