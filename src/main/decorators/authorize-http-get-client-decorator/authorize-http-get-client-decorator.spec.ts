import { AuthorizeHttpGetClientDecorator } from '@/main/decorators'
import { GetStorageSpy, mockGetRequest } from '@/data/test'

type SutTypes = {
    sut: AuthorizeHttpGetClientDecorator
    getStorageSpy: GetStorageSpy
}

const makeSut = (): SutTypes => {
    const getStorageSpy = new GetStorageSpy()
    const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy)
    return {
        sut,
        getStorageSpy
    }
}

describe('AuthorizeHttpGetClientDecorator', () => {
  test('deve chamar GetStorage com o valor correto', () => {
    const { sut, getStorageSpy } = makeSut()
    sut.get(mockGetRequest())
    expect(getStorageSpy.key).toBe('account')
  })
})
