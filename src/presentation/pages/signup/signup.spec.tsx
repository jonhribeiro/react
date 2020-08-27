import React from 'react'
import SignUp from './signup'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { Helper, ValidationStub } from '@/presentation/test'
import { ApiContext } from '@/presentation/contexts'
import faker from 'faker'
import { EmailInUseError } from '@/domain/errors'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { AddAccount } from '@/domain/usercases'
import { AddAccountSpy } from '@/domain/test'

type SutTypes = {
    addAccountSpy: AddAccountSpy
    setCurrentAccountMock: (account: AddAccount.Model) => void
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
        addAccountSpy,
        setCurrentAccountMock
    }
}

const simulateValidsubmit = async (name= faker.name.findName(), email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
    Helper.populateField('name', name)
    Helper.populateField('email', email)
    Helper.populateField('password', password)
    Helper.populateField('passwordConfirmation', password)
    const form = screen.getByTestId('form')
    fireEvent.submit(form)
    await waitFor(() => form)
}

describe('SignUp componente', () => {
    test('deve começar com o estado inicial', () => {
        const validationError = faker.random.words()
        makeSut({validationError})
        expect(screen.getByTestId('error-wrap').children).toHaveLength(0)
        expect(screen.getByTestId('submit')).toBeDisabled()
        Helper.testStatusForField('name', validationError)
        Helper.testStatusForField('email', validationError)
        Helper.testStatusForField('password', validationError)
        Helper.testStatusForField('passwordConfirmation', validationError)
    })

    test('deve chamar o name e testar a falha na validacao', () => {
        const validationError = faker.random.words()
        makeSut({validationError})
        Helper.populateField('name')
        Helper.testStatusForField('name', validationError)
    })

    test('deve chamar o email e testar a falha na validacao', () => {
        const validationError = faker.random.words()
        makeSut({validationError})
        Helper.populateField('email')
        Helper.testStatusForField('email', validationError)
    })

    test('deve chamar o password e testar a falha na validacao', () => {
        const validationError = faker.random.words()
        makeSut({validationError})
        Helper.populateField('password')
        Helper.testStatusForField('password', validationError)
    })

    test('deve chamar o passwordConfirmation e testar a falha na validacao', () => {
        const validationError = faker.random.words()
        makeSut({validationError})
        Helper.populateField('passwordConfirmation')
        Helper.testStatusForField('passwordConfirmation', validationError)
    })
    
    test('validar o campo name e passar na validacao', () => {
        makeSut()
        Helper.populateField('name')
        Helper.testStatusForField('name')
    })
    
    test('validar o campo email e passar na validacao', () => {
        makeSut()
        Helper.populateField('email')
        Helper.testStatusForField('email')
    })
    
    test('validar o campo password e passar na validacao', () => {
        makeSut()
        Helper.populateField('password')
        Helper.testStatusForField('password')
    })
    
    test('validar o campo passwordConfirmation e passar na validacao', () => {
        makeSut()
        Helper.populateField('passwordConfirmation')
        Helper.testStatusForField('passwordConfirmation')
    })
    
    test('botao habilitar quando formulario tiver preenchido', () => {
        makeSut()
        Helper.populateField('name')
        Helper.populateField('email')
        Helper.populateField('password')
        Helper.populateField('passwordConfirmation')
        expect(screen.getByTestId('submit')).toBeEnabled()
    })
    
    test('aparecer o spinner quando eu clicar no button para prosseguir', async () => {
        makeSut()
        await simulateValidsubmit()
        expect(screen.queryByTestId('spinner')).toBeInTheDocument()
    })

    test('testar a AddAccount com os valores correto', async () => {
        const { addAccountSpy } = makeSut()
        const name = faker.name.findName()
        const email = faker.internet.email()
        const password = faker.internet.password()
        await simulateValidsubmit(name, email, password)
        expect(addAccountSpy.params).toEqual({
            name,
            email,
            password,
            passwordConfirmation: password
        })
    })
    
    test('deve chamar a AddAccount apenas uma vez', async () => {
        const { addAccountSpy } = makeSut()
        await simulateValidsubmit()
        await simulateValidsubmit()
        expect(addAccountSpy.callsCount).toBe(1)
    })
    
    test('não deve chamar a AddAccount se o formulário for inválido', async () => {
        const validationError = faker.random.words()
        const { addAccountSpy } = makeSut({validationError})
        await simulateValidsubmit()
        expect(addAccountSpy.callsCount).toBe(0)
    })
    
    test('deve apresentar erro se a autenticação falhar', async () => {
        const { addAccountSpy } = makeSut()
        const error = new EmailInUseError()
        jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)
        await simulateValidsubmit()
        expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
        expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
    })

    test('deve adicionar SaveAccessToken em caso de sucesso', async () => {
        const { addAccountSpy, setCurrentAccountMock } = makeSut()
        await simulateValidsubmit()
        expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account)
        expect(history.length).toBe(1)
        expect(history.location.pathname).toBe('/')
    })
    
    test('deve ir para a página de login', async () => {
        makeSut()
        const loginLink = screen.getByTestId('login-link')
        fireEvent.click(loginLink)
        expect(history.length).toBe(1)
        expect(history.location.pathname).toBe('/login')
        
    })
})

