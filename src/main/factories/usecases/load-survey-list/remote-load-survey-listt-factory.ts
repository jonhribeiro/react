import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'
import { LoadSurveyList } from '@/domain/usercases'
import { RemoteLoadSurveyList } from '@/data/usecases'

export const makeRemoteLoadSurveyList = (): LoadSurveyList => {
    return new RemoteLoadSurveyList(makeApiUrl('/surveys'), makeAxiosHttpClient())

}