import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'

export class RemoteLoadSurveyList {
    constructor (
        private readonly url: string,
        private readonly httpGetClient: HttpGetClient
    ) {}

    async loadAll (): Promise<void> {
        const httResponse = await this.httpGetClient.get({ url: this.url })
        switch (httResponse.statusCode) {
            case HttpStatusCode.ok: break
            default: throw new UnexpectedError()
        }
    }
}