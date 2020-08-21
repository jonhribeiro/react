import { setCurrentAccountAdapter } from './current-account-adapter'
import { mockAcountModel } from '@/domain/test'
import { LocalStorageAdapter } from '@/infra/cache'
import { UnexpectedError } from '@/domain/errors'

jest.mock('@/infra/cache')

describe('CurrentAccountAdapter', () => {
    test('deve chamar LocallStorageAdapter com os valores corretos', () => {
        const account = mockAcountModel()
        const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')
        setCurrentAccountAdapter(account)
        expect(setSpy).toHaveBeenCalledWith('account', account)
    })

    test('deve lançar UnexpectedError', () => {
        expect(() => {
            setCurrentAccountAdapter(undefined)
        }).toThrow(new UnexpectedError())
    })
})