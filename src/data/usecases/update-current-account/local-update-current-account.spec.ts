import { SetStorageMock } from '@/data/test'
import { LocalUpdateCurrentAccount } from './local-update-current-account'
import { UnexpectedError } from "@/domain/errors"
import { mockAcountModel } from '@/domain/test'

type SutTypes = {
    sut: LocalUpdateCurrentAccount
    setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
    const setStorageMock = new SetStorageMock()
    const sut = new LocalUpdateCurrentAccount(setStorageMock)
    return {
        sut,
        setStorageMock
    }
}

describe('LocalUpdateCurrentAccount', () => {
    test('deve chamar SetStorage com o valor correto ', async () => {
        const {sut, setStorageMock } = makeSut()
        const account = mockAcountModel()
        await sut.save(account)
        expect(setStorageMock.key).toBe('account')
        expect(setStorageMock.value).toBe(JSON.stringify(account))
    })

    test('deve lançar mesmo se der erxercao no SetStorage lança deixa passar', async () => {
        const {sut, setStorageMock } = makeSut()
        jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error())
        const promise = sut.save(mockAcountModel())
        await expect(promise).rejects.toThrow(new Error())
    })

    test('deve lançar erxercao se o accessToken falhar', async () => {
        const {sut } = makeSut()
        const promise = sut.save(undefined)
        await expect(promise).rejects.toThrow(new UnexpectedError)
    })
})
