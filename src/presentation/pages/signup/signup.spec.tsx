import React from 'react'
import SignUp from './signup'
import { RenderResult, render, cleanup } from '@testing-library/react'
import { Helper, ValidationStub } from '@/presentation/test'
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
    const sut = render(
        <SignUp 
            validation={validationStub} 
        />
    )
    return {
        sut
    }
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
})