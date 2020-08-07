import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import faker from 'faker'
import { render, RenderResult, fireEvent, cleanup, waitFor } from '@testing-library/react'
import {Login} from '@/presentation/pages'
import { ValidationStub, AuthenticationSpy, SaveAccessTokenMock } from '@/presentation/test/'
import { InvalidCredentialsError } from '@/domain/errors'

type SutTypes = {
    sut: RenderResult
    authenticationSpy: AuthenticationSpy
    saveAccessTokenMock: SaveAccessTokenMock
}

type SutParams = {
    validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub()
    const authenticationSpy = new AuthenticationSpy()
    const saveAccessTokenMock = new SaveAccessTokenMock()
    validationStub.errorMessage = params?.validationError
    const sut = render(
        <Router history={history}>
            <Login 
                validation={validationStub} 
                authentication={authenticationSpy}
                saveAccessToken={saveAccessTokenMock}
            />
        </Router>
    )
    return {
        sut,
        authenticationSpy,
        saveAccessTokenMock
    }
}

const simulateValidsubmit = async (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password() ): Promise<void> => {
    populateEmailField(sut, email)
    populatePasswordField(sut, password)
    const form = sut.getByTestId('form')
    fireEvent.submit(form)
    await waitFor(() => form)
}

const populateEmailField = (sut: RenderResult, email = faker.internet.email() ): void => {
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (sut: RenderResult, password = faker.internet.password() ): void => {
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })
}

const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
    const emailStatus = sut.getByTestId(`${fieldName}-status`)
    expect(emailStatus.title).toBe(validationError || 'Tudo certo!')
    expect(emailStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

const testErrorWrapChildCount = (sut: RenderResult, count: number): void => {
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(count)
}

const testElementExists = (sut: RenderResult, fieldName: string): void => {
    const el = sut.getByTestId(fieldName)
    expect(el).toBeTruthy()
}

const testElementText = (sut: RenderResult, fieldName: string, text: string): void => {
    const el = sut.getByTestId(fieldName)
    expect(el.textContent).toBe(text)
}

const testButtonIsDisabled = (sut: RenderResult, fieldName: string, isDisabled: boolean): void => {
    const button = sut.getByTestId(fieldName) as HTMLButtonElement
    expect(button.disabled).toBe(isDisabled)
}

describe('login componente', () => {
    afterEach(cleanup)

    test('devemos não renderiza gerando erro no início e com o button desabilitado', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({validationError})
        testErrorWrapChildCount(sut, 0)
        testButtonIsDisabled(sut, 'submit', true)
        testStatusForField(sut, 'email', validationError)
        testStatusForField(sut, 'password', validationError)
    })

    test('deve chamar o email e testar a falha', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({validationError})
        populateEmailField(sut)
        testStatusForField(sut, 'email', validationError)
    })

    test('deve chamar o password e testar a falha', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({validationError})
        populatePasswordField(sut)
        testStatusForField(sut, 'password', validationError)
    })

    test('validar o campo password e passar na validacao', () => {
        const { sut } = makeSut()
        populatePasswordField(sut)
        testStatusForField(sut, 'password')
    })

    test('validar o campo email e passar na validacao', () => {
        const { sut } = makeSut()
        populateEmailField(sut)
        testStatusForField(sut, 'email')
    })

    test('botao habilitar quando formulario tiver preenchido', () => {
        const { sut } = makeSut()
        populateEmailField(sut)
        populatePasswordField(sut)
        testButtonIsDisabled(sut, 'submit', false)
    })

    test('aparecer o spinner quando eu clicar no button para prosseguir', async () => {
        const { sut } = makeSut()
        await simulateValidsubmit(sut)
        testElementExists(sut, 'spinner')
    })

    test('testar a autenticacao com os valores correto', async () => {
        const { sut, authenticationSpy } = makeSut()
        const email = faker.internet.email()
        const password = faker.internet.password()
        await simulateValidsubmit(sut, email, password)
        expect(authenticationSpy.params).toEqual({
            email,
            password
        })
    })

    test('deve chamar a autenticação apenas uma vez', async () => {
        const { sut, authenticationSpy } = makeSut()
        await simulateValidsubmit(sut)
        await simulateValidsubmit(sut)
        expect(authenticationSpy.callsCount).toBe(1)
    })

    test('não deve chamar a autenticação se o formulário for inválido', async () => {
        const validationError = faker.random.words()
        const { sut, authenticationSpy } = makeSut({validationError})
        await simulateValidsubmit(sut)
        expect(authenticationSpy.callsCount).toBe(0)
    })

    test('deve apresentar erro se a autenticação falhar', async () => {
        const { sut, authenticationSpy } = makeSut()
        const error = new InvalidCredentialsError()
        jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))
        await simulateValidsubmit(sut)
        testElementText(sut, 'main-error', error.message)
        testErrorWrapChildCount(sut, 1)
    })

    test('deve adicionar SaveAccessToken em caso de sucesso', async () => {
        const { sut, authenticationSpy, saveAccessTokenMock } = makeSut()
        await simulateValidsubmit(sut)
        expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken)
        expect(history.length).toBe(1)
        expect(history.location.pathname).toBe('/')
    })

    test('deve ir para a página de inscrição', async () => {
        const { sut } = makeSut()
        const register = sut.getByTestId('signup')
        fireEvent.click(register)
        expect(history.length).toBe(2)
        expect(history.location.pathname).toBe('/signup')
        
    })
})