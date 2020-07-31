import React from 'react'
import faker from 'faker'
import 'jest-localstorage-mock'
import { render, RenderResult, fireEvent, cleanup, waitFor } from '@testing-library/react'
import Login from './login'
import { ValidationStub, AuthenticationSpy } from '@/presentation/test/'
import { InvalidCredentialsError } from '@/domain/errors'

type SutTypes = {
    sut: RenderResult
    authenticationSpy: AuthenticationSpy
}

type SutParams = {
    validationError: string
}


const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub()
    const authenticationSpy = new AuthenticationSpy()
    validationStub.errorMessage = params?.validationError
    const sut = render(<Login validation={validationStub} authentication={authenticationSpy} />)
    return {
        sut,
        authenticationSpy
    }
}

const simulateValidsubmit = (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password() ): void => {
    populateEmailField(sut, email)
    populatePasswordField(sut, password)
    const submitButton = sut.getByTestId('submit')
    fireEvent.click(submitButton)
}

const populateEmailField = (sut: RenderResult, email = faker.internet.email() ): void => {
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (sut: RenderResult, password = faker.internet.password() ): void => {
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })
}

const sumulateStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
    const emailStatus = sut.getByTestId(`${fieldName}-status`)
    expect(emailStatus.title).toBe(validationError || 'Tudo certo!')
    expect(emailStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

describe('login componente', () => {
    afterEach(cleanup)
    
    beforeEach(() => {
        localStorage.clear()
    })

    test('devemos não renderiza gerando erro no início e com o button desabilitado', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({validationError})
        const errorWrap = sut.getByTestId('error-wrap')
        expect(errorWrap.childElementCount).toBe(0)
        const submitButton = sut.getByTestId('submit') as HTMLButtonElement
        expect(submitButton.disabled).toBe(true)
        sumulateStatusForField(sut, 'email', validationError)
        sumulateStatusForField(sut, 'password', validationError)
    })

    test('deve chamar o email e testar a falha', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({validationError})
        populateEmailField(sut)
        sumulateStatusForField(sut, 'email', validationError)
    })

    test('deve chamar o password e testar a falha', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({validationError})
        populatePasswordField(sut)
        sumulateStatusForField(sut, 'password', validationError)
    })

    test('validar o campo password e passar na validacao', () => {
        const { sut } = makeSut()
        populatePasswordField(sut)
        sumulateStatusForField(sut, 'password')
    })

    test('validar o campo email e passar na validacao', () => {
        const { sut } = makeSut()
        populateEmailField(sut)
        sumulateStatusForField(sut, 'email')
    })

    test('botao habilitar quando formulario tiver preenchido', () => {
        const { sut } = makeSut()
        populateEmailField(sut)
        populatePasswordField(sut)
        const submitButton = sut.getByTestId('submit') as HTMLButtonElement
        expect(submitButton.disabled).toBe(false)
    })

    test('aparecer o spinner quando eu clicar no button para prosseguir', () => {
        const { sut } = makeSut()
        simulateValidsubmit(sut)
        const spinner = sut.getByTestId('spinner')
        expect(spinner).toBeTruthy()
    })

    test('testar a autenticacao com os valores correto', () => {
        const { sut, authenticationSpy } = makeSut()
        const email = faker.internet.email()
        const password = faker.internet.password()
        simulateValidsubmit(sut, email, password)
        expect(authenticationSpy.params).toEqual({
            email,
            password
        })
    })

    test('deve chamar a autenticação apenas uma vez', () => {
        const { sut, authenticationSpy } = makeSut()
        simulateValidsubmit(sut)
        simulateValidsubmit(sut)
        expect(authenticationSpy.callsCount).toBe(1)
    })

    test('não deve chamar a autenticação se o formulário for inválido', () => {
        const validationError = faker.random.words()
        const { sut, authenticationSpy } = makeSut({validationError})
        populateEmailField(sut)
        fireEvent.submit(sut.getByTestId('form'))
        expect(authenticationSpy.callsCount).toBe(0)
    })

    test('deve apresentar erro se a autenticação falhar', async () => {
        const { sut, authenticationSpy } = makeSut()
        const error = new InvalidCredentialsError()
        jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))
        simulateValidsubmit(sut)
        const errorWrap = sut.getByTestId('error-wrap')
        await waitFor( () => errorWrap )
        const mainErro = sut.getByTestId('main-error')
        expect(mainErro.textContent).toBe(error.message)
        expect(errorWrap.childElementCount).toBe(1)
    })

    test('deve adicionar accessToken ao armazenamento local em caso de sucesso', async () => {
        const { sut, authenticationSpy } = makeSut()
        simulateValidsubmit(sut)
        await waitFor(() => sut.getByTestId('form'))
        expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessToken)
    })
})