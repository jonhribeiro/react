import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { AddAccount } from '@/domain/usercases'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'

export class RemoteAddAccount implements AddAccount {
  constructor (
    private readonly url: string,
    private readonly httppostClient: HttpPostClient<RemoteAddAccount.Model>
  ) {}

  async add (params: AddAccount.Params): Promise<AddAccount.Model> {
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

export namespace RemoteAddAccount {
  export type Model = AddAccount.Model
}
