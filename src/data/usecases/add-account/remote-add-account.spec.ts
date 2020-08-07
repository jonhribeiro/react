import { RemoteAddAccount } from './remote-add-account'
import { HttpPostClientSpy } from '@/data/test'
import { AddAccountParams } from '@/domain/usercases'
import { AccountModel } from '@/domain/models'
import { mockAddAccountParams } from '@/domain/test'
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
})