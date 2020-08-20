import faker from 'faker'
import 'jest-localstorage-mock'
import { LocalStorageAdapter } from './local-storage-adapter'

describe('LocalStorageAdapter', () => {
    beforeEach(() => {
      localStorage.clear()
    })
  
    test('Deve chamar localStorage.setItem com valores corretos', async () => {
      const sut = new LocalStorageAdapter()
      const key = faker.database.column()
      const value = faker.random.word()
      sut.set(key, value)
      expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
    })
})