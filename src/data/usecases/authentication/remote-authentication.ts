import { HttpPostClient } from "../../protocols/http/http-post-client";
import { AuthenticationParams } from "../../../domain/usercases/authentication";

export class RemoteAuthentication {
    constructor (
      private readonly url: string,
      private readonly httppostClient: HttpPostClient
    ) {}
  
    async auth (params: AuthenticationParams ): Promise<void> {
      await this.httppostClient.post({
        url: this.url,
        body: params
      })
    }
  }