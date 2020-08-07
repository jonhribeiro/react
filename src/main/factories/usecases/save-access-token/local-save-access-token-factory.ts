import { SaveAccessToken } from '@/domain/usercases'
import { LocalSaveAccessToken } from '@/data/usecases/local-save-access-token/local-save-access-token'
import { makeLocalStorageAdapter } from '@/main/factories/cache/local-storage-adapter-factory'

export const makeLocalSaveAccessToken = (): SaveAccessToken => {
    return new LocalSaveAccessToken(makeLocalStorageAdapter())

}