import faker from 'faker'
import 'jest-localstorage-mock'
import { LocalStorageAdapter } from './local-storage-adapter'
import { AccountModel } from '@/domain/models'

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter()

describe('LocalStorageAdapter', () => {
    beforeEach(() => {
      localStorage.clear()
    })
  
    test('Deve chamar localStorage.setItem com valores corretos', async () => {
      const sut = makeSut()
      const key = faker.database.column()
      const value = faker.random.objectElement<AccountModel>()
      sut.set(key, value)
      expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
    })
  
    test('Deve chamar localStorage.getItem com valor correto', async () => {
      const sut = makeSut()
      const key = faker.database.column()
      const value = faker.random.objectElement<AccountModel>()
      const getItemSpy = jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(JSON.stringify(value))
      const obj = sut.get(key)
      expect(obj).toEqual(value)
      expect(getItemSpy).toHaveBeenCalledWith(key)
    })
})