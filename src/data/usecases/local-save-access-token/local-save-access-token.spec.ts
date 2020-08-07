import { SetStorageMock } from "@/data/test/mock-storage"
import { LocalSaveAccessToken } from './local-save-access-token'
import faker from 'faker'

type SutTypes = {
    sut: LocalSaveAccessToken
    setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
    const setStorageMock = new SetStorageMock()
    const sut = new LocalSaveAccessToken(setStorageMock)
    return {
        sut,
        setStorageMock
    }
}

describe('LocalSaveAccessToken', () => {
    test('deve chamar SetStorage com o valor correto ', async () => {
        const {sut, setStorageMock } = makeSut()
        const accessToken = faker.random.uuid()
        await sut.save(accessToken)
        expect(setStorageMock.key).toBe('accessToken')
        expect(setStorageMock.value).toBe(accessToken)
    })

    test('deve lançar mesmo se der erxercao no SetStorage lança deixa passar', async () => {
        const {sut, setStorageMock } = makeSut()
        jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error())
        const promise = sut.save(faker.random.uuid())
        await expect(promise).rejects.toThrow(new Error())
    })
})