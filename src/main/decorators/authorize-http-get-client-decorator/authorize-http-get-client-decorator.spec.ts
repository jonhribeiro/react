import { AuthorizeHttpGetClientDecorator } from '@/main/decorators'
import { GetStorageSpy, mockGetRequest, HttpGetClientSpy } from '@/data/test'
import faker from 'faker'
import { HttpGetParams } from '@/data/protocols/http'
import { mockAcountModel } from '@/domain/test'

type SutTypes = {
    sut: AuthorizeHttpGetClientDecorator
    getStorageSpy: GetStorageSpy
    httpGetClientSpy: HttpGetClientSpy
}

const makeSut = (): SutTypes => {
    const getStorageSpy = new GetStorageSpy()
    const httpGetClientSpy = new HttpGetClientSpy()
    const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy, httpGetClientSpy)
    return {
        sut,
        getStorageSpy,
        httpGetClientSpy
    }
}

describe('AuthorizeHttpGetClientDecorator', () => {
  test('deve chamar GetStorage com o valor correto', async () => {
    const { sut, getStorageSpy } = makeSut()
    await sut.get(mockGetRequest())
    expect(getStorageSpy.key).toBe('account')
  })

  test('não deve adicionar headers se GetStorage for inválido', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const httpRequest: HttpGetParams = {
        url: faker.internet.url(),
        headers: {
            field: faker.random.words()
        }
    }
    await sut.get(httpRequest)
    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.headers).toEqual(httpRequest.headers)
  })

  test('deve adicionar headers HttpGetClient', async () => {
    const { sut, getStorageSpy, httpGetClientSpy } = makeSut()
    getStorageSpy.value = mockAcountModel()
    const httpRequest: HttpGetParams = {
        url: faker.internet.url()
    }
    await sut.get(httpRequest)
    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.headers).toEqual({
        'x-access-token': getStorageSpy.value.accessToken
    })
  })

  test('deve adicionar headers que ja vem na funcao HttpGetClient', async () => {
    const { sut, getStorageSpy, httpGetClientSpy } = makeSut()
    getStorageSpy.value = mockAcountModel()
    const field = faker.random.words()
    const httpRequest: HttpGetParams = {
        url: faker.internet.url(),
        headers: {
            field
        }
    }
    await sut.get(httpRequest)
    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.headers).toEqual({
        field,
        'x-access-token': getStorageSpy.value.accessToken
    })
  })
})
