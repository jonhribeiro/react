import { AxiosHttpClient } from './axios-http-cliente'
import { mockAxios } from '@/infra/test'
import { mockPostRequest } from '@/data/test'
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
    test('deve chamar axios com o URL correto com valores', async () => {
        const request = mockPostRequest()
        const {sut, mockedAxios} = makeSut()
        await sut.post(request)
        expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    }) 

    test('deve retornar o código de status e o corpo corretos', () => {
        const {sut, mockedAxios} = makeSut()
        const promise = sut.post(mockPostRequest())
        expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
    }) 
})