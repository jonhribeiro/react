import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import { SurveyModel } from '@/domain/models'
import { LoadSurveyList } from '@/domain/usercases/load-survey-list'

export class RemoteLoadSurveyList implements LoadSurveyList {
    constructor (
        private readonly url: string,
        private readonly httpGetClient: HttpGetClient<SurveyModel[]>
    ) {}

    async loadAll (): Promise<SurveyModel[]> {
        const httResponse = await this.httpGetClient.get({ url: this.url })
        switch (httResponse.statusCode) {
            case HttpStatusCode.ok: return httResponse.body
            default: throw new UnexpectedError()
        }
    }
}