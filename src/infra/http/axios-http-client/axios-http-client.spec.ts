import { AxiosHttpClient } from './axios-http-cliente'
import axios from 'axios'
import faker from 'faker'
import { HttpPostParams } from '@/data/protocols/http'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const mockedAxiosResult = {
    data: faker.random.objectElement(),
    status: faker.random.number()
}
mockedAxios.post.mockResolvedValue(mockedAxiosResult)

const makeSut = (): AxiosHttpClient => {
    return new AxiosHttpClient()
}

const mockPostRequest = (): HttpPostParams<any> => ({
    url: faker.internet.url(),
    body: faker.random.objectElement()
})

describe('AxiosHttpClient', () => {
    test('deve chamar axios com o URL correto com valores', async () => {
        const request = mockPostRequest()
        const sut = makeSut()
        await sut.post(request)
        expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    }) 

    test('deve retornar o código de status e o corpo corretos', async () => {
        const sut = makeSut()
        const httpResponse = await sut.post(mockPostRequest())
        expect(httpResponse).toEqual({
            statusCode: mockedAxiosResult.status,
            body: mockedAxiosResult.data
        })
    }) 
})