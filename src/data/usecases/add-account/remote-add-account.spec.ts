import { RemoteAddAccount } from './remote-add-account'
import { HttpPostClientSpy } from '@/data/test'
import { AddAccountParams } from '@/domain/usercases'
import { AccountModel } from '@/domain/models'
import { mockAddAccountParams } from '@/domain/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { EmailInUseError} from '@/domain/errors'
import faker from 'faker'

type SutTypes = {
    sut: RemoteAddAccount
    httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
    const httpPostClientSpy = new HttpPostClientSpy<AddAccountParams, AccountModel>()
    const sut = new RemoteAddAccount(url, httpPostClientSpy)
    return {
        sut,
        httpPostClientSpy
    }
}

describe('RemoteAddAccount', () => {
    test('deve chamar HttpPostClient com o URL correto', async () => {
      const url = faker.internet.url()
      const { sut, httpPostClientSpy } = makeSut(url)
      await sut.add(mockAddAccountParams())
      expect(httpPostClientSpy.url).toBe(url)
    })

    test('deve chamar HttpPostClient com o body correto', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        const addAccountParams = mockAddAccountParams()
        await sut.add(addAccountParams)
        expect(httpPostClientSpy.body).toEqual(addAccountParams)
    })

    test('deve mostra o erro se o email ja estiver sendo usado erro 403', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
          statusCode: HttpStatusCode.forbidden
        }
        const promise = sut.add(mockAddAccountParams())
        await expect(promise).rejects.toThrow(new EmailInUseError())
      })
})