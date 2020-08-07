import { HttpPostClient } from '@/data/protocols/http';
import { AddAccount, AddAccountParams } from '@/domain/usercases'
import { AccountModel } from '@/domain/models';

export class RemoteAddAccount implements AddAccount {
    constructor (
        private readonly url: string,
        private readonly httppostClient: HttpPostClient<AddAccountParams, AccountModel>
    ) {}

    async add (params: AddAccountParams): Promise<AccountModel> {
        await this.httppostClient.post({
            url: this.url,
            body: params
        })
        return null
    }
}