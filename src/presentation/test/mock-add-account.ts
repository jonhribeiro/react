import { AddAccountParams, AddAccount } from '@/domain/usercases'
import { AccountModel } from '@/domain/models'
import { mockAcountModel } from '@/domain/test'

export class AddAccountSpy implements AddAccount {
    account = mockAcountModel()
    params: AddAccountParams
    // callsCount = 0

    async add (params: AddAccountParams): Promise<AccountModel> {
        this.params = params
        // this.callsCount++
        return this.account
    }
}