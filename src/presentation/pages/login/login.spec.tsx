import React from 'react'
import faker from 'faker'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import Login from './login'
import { ValidationStub } from '@/presentation/test/'
import { Authentication, AuthenticationParams } from '@/domain/usercases'
import { AccountModel } from '@/domain/models'
import { mockAcountModel } from '@/domain/test'

class AuthenticationSpy implements Authentication {
    account = mockAcountModel()
    params: AuthenticationParams
    async auth (params: AuthenticationParams): Promise<AccountModel> {
        this.params = params
        return Promise.resolve(this.account)
    }
}

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

describe('login componente', () => {
    afterEach(cleanup)

    test('devemos não renderiza gerando erro no início e com o button desabilitado', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({validationError})
        const errorWrap = sut.getByTestId('error-wrap')
        expect(errorWrap.childElementCount).toBe(0)
        const submitButton = sut.getByTestId('submit') as HTMLButtonElement
        expect(submitButton.disabled).toBe(true)
        const emailStatus = sut.getByTestId('email-status')
        expect(emailStatus.title).toBe(validationError)
        expect(emailStatus.textContent).toBe('🔴')
        const passwordStatus = sut.getByTestId('password-status')
        expect(passwordStatus.title).toBe(validationError)
        expect(passwordStatus.textContent).toBe('🔴')
    })

    test('deve chamar o email e testar a falha', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({validationError})
        const emailInput = sut.getByTestId('email')
        fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
        const emailStatus = sut.getByTestId('email-status')
        expect(emailStatus.title).toBe(validationError)
        expect(emailStatus.textContent).toBe('🔴')
    })

    test('deve chamar o password e testar a falha', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({validationError})
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
        const passwordStatus = sut.getByTestId('password-status')
        expect(passwordStatus.title).toBe(validationError)
        expect(passwordStatus.textContent).toBe('🔴')
    })

    test('validar o campo password e passar na validacao', () => {
        const { sut } = makeSut()
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
        const passwordStatus = sut.getByTestId('password-status')
        expect(passwordStatus.title).toBe('Tudo certo!')
        expect(passwordStatus.textContent).toBe('🟢')
    })

    test('validar o campo email e passar na validacao', () => {
        const { sut } = makeSut()
        const emailInput = sut.getByTestId('email')
        fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
        const emailStatus = sut.getByTestId('email-status')
        expect(emailStatus.title).toBe('Tudo certo!')
        expect(emailStatus.textContent).toBe('🟢')
    })

    test('botao habilitar quando formulario tiver preenchido', () => {
        const { sut } = makeSut()
        const emailInput = sut.getByTestId('email')
        fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
        const submitButton = sut.getByTestId('submit') as HTMLButtonElement
        expect(submitButton.disabled).toBe(false)
    })

    test('aparecer o spinner quando eu clicar no button para prosseguir', () => {
        const { sut } = makeSut()
        const emailInput = sut.getByTestId('email')
        fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
        const submitButton = sut.getByTestId('submit')
        fireEvent.click(submitButton)
        const spinner = sut.getByTestId('spinner')
        expect(spinner).toBeTruthy()
    })

    test('testar a autenticacao com os valores correto', () => {
        const { sut, authenticationSpy } = makeSut()
        const emailInput = sut.getByTestId('email')
        const email = faker.internet.email()
        fireEvent.input(emailInput, { target: { value: email } })
        const passwordInput = sut.getByTestId('password')
        const password = faker.internet.password()
        fireEvent.input(passwordInput, { target: { value: password } })
        const submitButton = sut.getByTestId('submit')
        fireEvent.click(submitButton)
        expect(authenticationSpy.params).toEqual({
            email,
            password
        })
    })
})