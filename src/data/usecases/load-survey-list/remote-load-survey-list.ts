import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import { LoadSurveyList } from '@/domain/usercases'

export class RemoteLoadSurveyList implements LoadSurveyList {
    constructor (
        private readonly url: string,
        private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyList.Model[]>
    ) {}

    async loadAll (): Promise<LoadSurveyList.Model[]> {
        const httResponse = await this.httpGetClient.get({ url: this.url })
        const remoteSurveys = httResponse.body || []
        switch (httResponse.statusCode) {
            case HttpStatusCode.ok: return remoteSurveys.map(remoteSurvey => Object.assign(remoteSurvey, {
                date: new Date(remoteSurvey.date)
            }))
            case HttpStatusCode.noContent: return []
            default: throw new UnexpectedError()
        }
    }
}

export namespace RemoteLoadSurveyList {
    export type Model = {
        id: string
        question: string
        date: string
        diaAnswer: boolean
    }
  }