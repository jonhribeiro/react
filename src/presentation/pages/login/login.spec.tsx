import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import Login from './login'
import { ValidationStub } from '@/presentation/test/'
import faker from 'faker'

type SutTypes = {
    sut: RenderResult
}

type SutParams = {
    validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub()
    validationStub.errorMessage = params?.validationError
    const sut = render(<Login validation={validationStub} />)
    return {
        sut,
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
})