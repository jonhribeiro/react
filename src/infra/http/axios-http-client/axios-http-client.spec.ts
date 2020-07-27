import { AxiosHttpClient } from './axios-http-cliente'
import axios from 'axios'
import faker from 'faker'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('AxiosHttpClient', () => {
    test('deve chamar axios com o URL correto', async () => {
        const url = faker.internet.url()
        const sut = new AxiosHttpClient()
        await sut.post({ url })
        expect(mockedAxios).toHaveBeenCalledWith(url)
    }) 
})