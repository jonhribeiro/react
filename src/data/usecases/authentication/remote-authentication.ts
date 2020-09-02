import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { Authentication } from '@/domain/usercases'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httppostClient: HttpPostClient<RemoteAuthentication.Model>
  ) {}

  async auth (params: Authentication.Params): Promise<Authentication.Model> {
    const httResponse = await this.httppostClient.post({
      url: this.url,
      body: params
    })
    switch (httResponse.statusCode) {
      case HttpStatusCode.ok: return httResponse.body
      case HttpStatusCode.unathorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteAuthentication {
  export type Model = Authentication.Model
}
