import React from 'react'
import SignUp from './signup'
import { RenderResult, render, cleanup, fireEvent, waitFor } from '@testing-library/react'
import { Helper, ValidationStub, AddAccountSpy } from '@/presentation/test'
import faker from 'faker'

type SutTypes = {
    sut: RenderResult
    addAccountSpy: AddAccountSpy
}

type SutParams = {
    validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
    const addAccountSpy =  new AddAccountSpy()
    const validationStub = new ValidationStub()
    validationStub.errorMessage = params?.validationError
    const sut = render(
        <SignUp 
            validation={validationStub} 
            addAccount={addAccountSpy} 
        />
    )
    return {
        sut,
        addAccountSpy
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
})