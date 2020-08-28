import { setCurrentAccountAdapter, getCurrentAccountAdapter } from './current-account-adapter'
import { mockAccountModel } from '@/domain/test'
import { LocalStorageAdapter } from '@/infra/cache'

jest.mock('@/infra/cache')

describe('CurrentAccountAdapter', () => {
    test('deve chamar LocallStorageAdapter com os valores corretos', () => {
        const account = mockAccountModel()
        const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')
        setCurrentAccountAdapter(account)
        expect(setSpy).toHaveBeenCalledWith('account', account)
    })

    test('deve chamar LocallStorageAdapter.get com os valores corretos', () => {
        const account = mockAccountModel()
        const getSpy = jest.spyOn(LocalStorageAdapter.prototype, 'get').mockReturnValueOnce(account)
        const result = getCurrentAccountAdapter()
        expect(getSpy).toHaveBeenCalledWith('account')
        expect(result).toEqual(account)
    })
})