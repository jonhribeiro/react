import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-cliente'

export const makeAxiosHttpClient = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}
