import { AxiosHttpClient } from './axios-http-cliente'
import axios from 'axios'
import faker from 'faker'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const makeSut = (): AxiosHttpClient => {
    return new AxiosHttpClient()
}

describe('AxiosHttpClient', () => {
    test('deve chamar axios com o URL correto com verbo correto', async () => {
        const url = faker.internet.url()
        const sut = makeSut()
        await sut.post({ url })
        expect(mockedAxios.post).toHaveBeenCalledWith(url)
    }) 
})