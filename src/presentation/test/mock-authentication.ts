import { Authentication, AuthenticationParams } from '@/domain/usercases'
import { AccountModel } from '@/domain/models'
import { mockAcountModel } from '@/domain/test'

export class AuthenticationSpy implements Authentication {
    account = mockAcountModel()
    params: AuthenticationParams
    async auth (params: AuthenticationParams): Promise<AccountModel> {
        this.params = params
        return Promise.resolve(this.account)
    }
}