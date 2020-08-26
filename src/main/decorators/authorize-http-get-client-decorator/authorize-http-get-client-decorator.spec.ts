import { AuthorizeHttpGetClientDecorator } from '@/main/decorators'
import { GetStorageSpy, mockGetRequest } from '@/data/test'

describe('AuthorizeHttpGetClientDecorator', () => {
  test('deve chamar GetStorage com o valor correto', () => {
    const getStorageSpy = new GetStorageSpy()
    const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy)
    sut.get(mockGetRequest())
    expect(getStorageSpy.key).toBe('account')
  })
})
