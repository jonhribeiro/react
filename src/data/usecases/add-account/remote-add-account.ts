import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http';
import { AddAccount, AddAccountParams } from '@/domain/usercases'
import { AccountModel } from '@/domain/models';
import { EmailInUseError } from '@/domain/errors';

export class RemoteAddAccount implements AddAccount {
    constructor (
        private readonly url: string,
        private readonly httppostClient: HttpPostClient<AddAccountParams, AccountModel>
    ) {}

    async add (params: AddAccountParams): Promise<AccountModel> {
        const httResponse = await this.httppostClient.post({
            url: this.url,
            body: params
        })
        switch (httResponse.statusCode) {
            case HttpStatusCode.forbidden: throw new EmailInUseError()
             default: return null
        }
    }
}