import { AxiosHttpClient } from './axios-http-cliente'
import { mockAxios, mockHttpResponse } from '@/infra/test'
import { mockPostRequest, mockGetRequest } from '@/data/test'
import axios from 'axios'

jest.mock('axios')

type SutTypes = {
    sut: AxiosHttpClient
    mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => { 
    const sut = new AxiosHttpClient()
    const mockedAxios = mockAxios()
    return {
        sut,
        mockedAxios
    }
}

describe('AxiosHttpClient', () => {
    describe('post', () => {
        test('deve chamar axios.post com o URL correto com valores', async () => {
            const request = mockPostRequest()
            const {sut, mockedAxios} = makeSut()
            await sut.post(request)
            expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
        }) 

        test('deve retornar o código de status corretos com axios.post', () => {
            const {sut, mockedAxios} = makeSut()
            const promise = sut.post(mockPostRequest())
            expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
        }) 

        test('deve retornar o statusCode corretos em caso de falha axios.post', () => {
            const {sut, mockedAxios} = makeSut()
            mockedAxios.post.mockRejectedValueOnce({
                response: mockHttpResponse()
            })
            const promise = sut.post(mockPostRequest())
            expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
        }) 
    })

    describe('get', () => {
        test('deve chamar axios.get com o URL correto com valores', async () => {
            const request = mockGetRequest()
            const {sut, mockedAxios} = makeSut()
            await sut.get(request)
            expect(mockedAxios.get).toHaveBeenCalledWith(request.url)
        }) 
    }) 
})