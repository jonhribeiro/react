import { SetStorageSpy } from "@/data/test/mock-storage"
import { LocalSaveAccessToken } from './local-save-access-token'
import faker from 'faker'

type SutTypes = {
    sut: LocalSaveAccessToken
    setStorageSpy: SetStorageSpy
}

const makeSut = (): SutTypes => {
    const setStorageSpy = new SetStorageSpy()
    const sut = new LocalSaveAccessToken(setStorageSpy)
    return {
        sut,
        setStorageSpy
    }
}

describe('LocalSaveAccessToken', () => {
    test('deve chamar SetStorage com o valor correto ', async () => {
        const {sut, setStorageSpy } = makeSut()
        const accessToken = faker.random.uuid()
        await sut.save(accessToken)
        expect(setStorageSpy.key).toBe('accessToken')
        expect(setStorageSpy.value).toBe(accessToken)
    })
})
