import { HttpPostClient } from "data/protocols/http/http-post-client"
import { RemoteAuthentication } from "./remote-authentication"
import { HttpPostClientSpy } from "../../test/mock-http-client"

describe('RemoteAuthentication', () => {
  test('deve chamar HttpPostClient com o URL correto', async () => {
    const url = 'any_url'
    const httpPostClientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)
    await sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })
})