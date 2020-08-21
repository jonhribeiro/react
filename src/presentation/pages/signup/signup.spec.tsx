import React from 'react'
import SignUp from './signup'
import { RenderResult, render, cleanup, fireEvent, waitFor } from '@testing-library/react'
import { Helper, ValidationStub, AddAccountSpy } from '@/presentation/test'
import { ApiContext } from '@/presentation/contexts'
import faker from 'faker'
import { EmailInUseError } from '@/domain/errors'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { AccountModel } from '@/domain/models'

type SutTypes = {
    sut: RenderResult
    addAccountSpy: AddAccountSpy
    setCurrentAccountMock: (account: AccountModel) => void
}

type SutParams = {
    validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/signup'] })
const makeSut = (params?: SutParams): SutTypes => {
    const addAccountSpy =  new AddAccountSpy()
    const validationStub = new ValidationStub()
    validationStub.errorMessage = params?.validationError
    const setCurrentAccountMock = jest.fn()
    const sut = render(
        <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
            <Router history={history}>
                <SignUp 
                    validation={validationStub} 
                    addAccount={addAccountSpy} 
                />
            </Router>
        </ApiContext.Provider>
    )
    return {
        sut,
        addAccountSpy,
        setCurrentAccountMock
    }
}

const simulateValidsubmit = async (sut: RenderResult, name= faker.name.findName(), email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
    Helper.populateField(sut, 'name', name)
    Helper.populateField(sut, 'email', email)
    Helper.populateField(sut, 'password', password)
    Helper.populateField(sut, 'passwordConfirmation', password)
    const form = sut.getByTestId('form')
    fireEvent.submit(form)
    await waitFor(() => form)
}

describe('SignUp componente', () => {
    afterEach(cleanup)

    test('deve começar com o estado inicial', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({validationError})
        Helper.testChildCount(sut, 'error-wrap', 0)
        Helper.testButtonIsDisabled(sut, 'submit', true)
        Helper.testStatusForField(sut, 'name', validationError)
        Helper.testStatusForField(sut, 'email', validationError)
        Helper.testStatusForField(sut, 'password', validationError)
        Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
    })

    test('deve chamar o name e testar a falha na validacao', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({validationError})
        Helper.populateField(sut, 'name')
        Helper.testStatusForField(sut, 'name', validationError)
    })

    test('deve chamar o email e testar a falha na validacao', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({validationError})
        Helper.populateField(sut, 'email')
        Helper.testStatusForField(sut, 'email', validationError)
    })

    test('deve chamar o password e testar a falha na validacao', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({validationError})
        Helper.populateField(sut, 'password')
        Helper.testStatusForField(sut, 'password', validationError)
    })

    test('deve chamar o passwordConfirmation e testar a falha na validacao', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({validationError})
        Helper.populateField(sut, 'passwordConfirmation')
        Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
    })
    
    test('validar o campo name e passar na validacao', () => {
        const { sut } = makeSut()
        Helper.populateField(sut, 'name')
        Helper.testStatusForField(sut, 'name')
    })
    
    test('validar o campo email e passar na validacao', () => {
        const { sut } = makeSut()
        Helper.populateField(sut, 'email')
        Helper.testStatusForField(sut, 'email')
    })
    
    test('validar o campo password e passar na validacao', () => {
        const { sut } = makeSut()
        Helper.populateField(sut, 'password')
        Helper.testStatusForField(sut, 'password')
    })
    
    test('validar o campo passwordConfirmation e passar na validacao', () => {
        const { sut } = makeSut()
        Helper.populateField(sut, 'passwordConfirmation')
        Helper.testStatusForField(sut, 'passwordConfirmation')
    })
    
    test('botao habilitar quando formulario tiver preenchido', () => {
        const { sut } = makeSut()
        Helper.populateField(sut, 'name')
        Helper.populateField(sut, 'email')
        Helper.populateField(sut, 'password')
        Helper.populateField(sut, 'passwordConfirmation')
        Helper.testButtonIsDisabled(sut, 'submit', false)
    })
    
    test('aparecer o spinner quando eu clicar no button para prosseguir', async () => {
        const { sut } = makeSut()
        await simulateValidsubmit(sut)
        Helper.testElementExists(sut, 'spinner')
    })

    test('testar a AddAccount com os valores correto', async () => {
        const { sut, addAccountSpy } = makeSut()
        const name = faker.name.findName()
        const email = faker.internet.email()
        const password = faker.internet.password()
        await simulateValidsubmit(sut, name, email, password)
        expect(addAccountSpy.params).toEqual({
            name,
            email,
            password,
            passwordConfirmation: password
        })
    })
    
    test('deve chamar a AddAccount apenas uma vez', async () => {
        const { sut, addAccountSpy } = makeSut()
        await simulateValidsubmit(sut)
        await simulateValidsubmit(sut)
        expect(addAccountSpy.callsCount).toBe(1)
    })
    
    test('não deve chamar a AddAccount se o formulário for inválido', async () => {
        const validationError = faker.random.words()
        const { sut, addAccountSpy } = makeSut({validationError})
        await simulateValidsubmit(sut)
        expect(addAccountSpy.callsCount).toBe(0)
    })
    
    test('deve apresentar erro se a autenticação falhar', async () => {
        const { sut, addAccountSpy } = makeSut()
        const error = new EmailInUseError()
        jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)
        await simulateValidsubmit(sut)
        Helper.testElementText(sut, 'main-error', error.message)
        Helper.testChildCount(sut, 'error-wrap', 1)
    })

    test('deve adicionar SaveAccessToken em caso de sucesso', async () => {
        const { sut, addAccountSpy, setCurrentAccountMock } = makeSut()
        await simulateValidsubmit(sut)
        expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account)
        expect(history.length).toBe(1)
        expect(history.location.pathname).toBe('/')
    })
    
    test('deve ir para a página de login', async () => {
        const { sut } = makeSut()
        const loginLink = sut.getByTestId('login-link')
        fireEvent.click(loginLink)
        expect(history.length).toBe(1)
        expect(history.location.pathname).toBe('/login')
        
    })
})