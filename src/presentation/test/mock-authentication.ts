import { Authentication, AuthenticationParams } from '@/domain/usercases'
import { AccountModel } from '@/domain/models'
import { mockAcountModel } from '@/domain/test'

export class AuthenticationSpy implements Authentication {
    account = mockAcountModel()
    params: AuthenticationParams
    callsCount = 0

    async auth (params: AuthenticationParams): Promise<AccountModel> {
        this.params = params
        this.callsCount++
        return Promise.resolve(this.account)
    }
}