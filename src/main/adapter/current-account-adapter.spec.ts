import { setCurrentAccountAdapter } from './current-account-adapter'
import { mockAcountModel } from '@/domain/test'
import { LocalStorageAdapter } from '@/infra/cache'

jest.mock('@/infra/cache')

describe('CurrentAccountAdapter', () => {
    test('deve chamar LocallStorageAdapter com os valores corretos', () => {
        const account = mockAcountModel()
        const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')
        setCurrentAccountAdapter(account)
        expect(setSpy).toHaveBeenCalledWith('account', account)
    })
})