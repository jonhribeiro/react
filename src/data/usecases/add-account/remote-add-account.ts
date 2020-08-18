import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http';
import { AddAccount, AddAccountParams } from '@/domain/usercases'
import { AccountModel } from '@/domain/models';
import { EmailInUseError, UnexpectedError } from '@/domain/errors';

export class RemoteAddAccount implements AddAccount {
    constructor (
        private readonly url: string,
        private readonly httppostClient: HttpPostClient<AccountModel>
    ) {}

    async add (params: AddAccountParams): Promise<AccountModel> {
        const httResponse = await this.httppostClient.post({
            url: this.url,
            body: params
        })
        switch (httResponse.statusCode) {
            case HttpStatusCode.ok: return httResponse.body
            case HttpStatusCode.forbidden: throw new EmailInUseError()
             default: throw new UnexpectedError()
        }
    }
}