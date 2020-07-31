import { HttpPostClient, HttpStatusCode } from "@/data/protocols/http";
import { AuthenticationParams, Authentication } from "@/domain/usercases";
import { InvalidCredentialsError, UnexpectedError } from "@/domain/errors";
import { AccountModel } from "@/domain/models";

export class RemoteAuthentication implements Authentication {
    constructor (
      private readonly url: string,
      private readonly httppostClient: HttpPostClient<AuthenticationParams, AccountModel>
    ) {}
  
    async auth (params: AuthenticationParams ): Promise<AccountModel> {
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