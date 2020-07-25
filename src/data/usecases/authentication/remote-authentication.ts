import { HttpPostClient } from "data/protocols/http/http-post-client";

export class RemoteAuthentication {
    constructor (
      private readonly url: string,
      private readonly httppostClient: HttpPostClient
    ) {}
  
    async auth (): Promise<void> {
      await this.httppostClient.post({
        url: this.url
      })
    }
  }