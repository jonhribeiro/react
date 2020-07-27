import { HttpPostClient } from "@/data/protocols/http/http-post-client";
import { AuthenticationParams } from "@/domain/usercases/authentication";
import { HttpStatusCode } from "@/data/protocols/http/http-response";
import { IncalidCredentialsError } from "@/domain/errors/invalid-credentials-error";
import { UnexpectedError } from "@/domain/errors/unexpected-error";

export class RemoteAuthentication {
    constructor (
      private readonly url: string,
      private readonly httppostClient: HttpPostClient
    ) {}
  
    async auth (params: AuthenticationParams ): Promise<void> {
      const httResponse = await this.httppostClient.post({
        url: this.url,
        body: params
      })
      switch (httResponse.statusCode) {
        case HttpStatusCode.ok: break
        case HttpStatusCode.unathorized: throw new IncalidCredentialsError()
        default: throw new UnexpectedError()
      }
    }
  }