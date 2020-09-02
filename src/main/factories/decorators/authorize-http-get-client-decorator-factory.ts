import { AuthorizeHttpGetClientDecorator } from '@/main/decorators'
import { makeAxiosHttpClient } from '@/main/factories/http'
import { makeLocalStorageAdapter } from '@/main/factories/cache'
import { HttpGetClient } from '@/data/protocols/http'

export const makeAuthorizeHttpGetClientDecorator = (): HttpGetClient => {
  return new AuthorizeHttpGetClientDecorator(makeLocalStorageAdapter(), makeAxiosHttpClient())
}
