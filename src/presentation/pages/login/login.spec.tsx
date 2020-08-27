import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import faker from 'faker'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { ApiContext } from '@/presentation/contexts'
import {Login} from '@/presentation/pages'
import { ValidationStub, Helper } from '@/presentation/test'
import { InvalidCredentialsError } from '@/domain/errors'
import { Authentication } from '@/domain/usercases'
import { Authenticationspy } from '@/domain/test'

type SutTypes = {
    authenticationSpy: Authenticationspy
    setCurrentAccountMock: (account: Authentication.Model) => void
}

type SutParams = {
    validationError: string 
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub()
    validationStub.errorMessage = params?.validationError
    const authenticationSpy = new Authenticationspy()
    const setCurrentAccountMock = jest.fn()
    render(
        <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
            <Router history={history}>
                <Login 
                    validation={validationStub} 
                    authentication={authenticationSpy}
                />
            </Router>
        </ApiContext.Provider>
    )
    return {
        authenticationSpy,
        setCurrentAccountMock
    }
}

const simulateValidsubmit = async (email = faker.internet.email(), password = faker.internet.password() ): Promise<void> => {
    Helper.populateField('email', email)
    Helper.populateField('password', password)
    const form = screen.getByTestId('form')
    fireEvent.submit(form)
    await waitFor(() => form)
}

describe('login componente', () => {
    test('devemos não renderiza gerando erro no início e com o button desabilitado', () => {
        const validationError = faker.random.words()
        makeSut({validationError})
        expect(screen.getByTestId('error-wrap').children).toHaveLength(0)
        expect(screen.getByTestId('submit')).toBeDisabled()
        Helper.testStatusForField('email', validationError)
        Helper.testStatusForField('password', validationError)
    })

    test('deve chamar o email e testar a falha', () => {
        const validationError = faker.random.words()
        makeSut({validationError})
        Helper.populateField('email')
        Helper.testStatusForField('email', validationError)
    })

    test('deve chamar o password e testar a falha', () => {
        const validationError = faker.random.words()
        makeSut({validationError})
        Helper.populateField('password')
        Helper.testStatusForField('password', validationError)
    })

    test('validar o campo password e passar na validacao', () => {
        makeSut()
        Helper.populateField('password')
        Helper.testStatusForField('password')
    })

    test('validar o campo email e passar na validacao', () => {
        makeSut()
        Helper.populateField('email')
        Helper.testStatusForField('email')
    })

    test('botao habilitar quando formulario tiver preenchido', () => {
        makeSut()
        Helper.populateField('email')
        Helper.populateField('password')
        expect(screen.getByTestId('submit')).toBeEnabled()
    })

    test('aparecer o spinner quando eu clicar no button para prosseguir', async () => {
        makeSut()
        await simulateValidsubmit()
        expect(screen.queryByTestId('spinner')).toBeInTheDocument()
    })

    test('testar a autenticacao com os valores correto', async () => {
        const { authenticationSpy } = makeSut()
        const email = faker.internet.email()
        const password = faker.internet.password()
        await simulateValidsubmit(email, password)
        expect(authenticationSpy.params).toEqual({
            email,
            password
        })
    })

    test('deve chamar a autenticação apenas uma vez', async () => {
        const { authenticationSpy } = makeSut()
        await simulateValidsubmit()
        await simulateValidsubmit()
        expect(authenticationSpy.callsCount).toBe(1)
    })

    test('não deve chamar a autenticação se o formulário for inválido', async () => {
        const validationError = faker.random.words()
        const { authenticationSpy } = makeSut({validationError})
        await simulateValidsubmit()
        expect(authenticationSpy.callsCount).toBe(0)
    })

    test('deve apresentar erro se a autenticação falhar', async () => {
        const { authenticationSpy } = makeSut()
        const error = new InvalidCredentialsError()
        jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)
        await simulateValidsubmit()
        expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
        expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
    })
    
    test('deve adicionar SaveAccessToken em caso de sucesso', async () => {
        const { authenticationSpy, setCurrentAccountMock } = makeSut()
        await simulateValidsubmit()
        expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account)
        expect(history.length).toBe(1)
        expect(history.location.pathname).toBe('/')
    })

    test('deve ir para a página de inscrição', async () => {
        makeSut()
        const register = screen.getByTestId('signup-link')
        fireEvent.click(register)
        expect(history.length).toBe(2)
        expect(history.location.pathname).toBe('/signup')
        
    })
})