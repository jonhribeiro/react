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
        Helper.testStatusForField(sut, 'email', 'Campo obrigatório')
        Helper.testStatusForField(sut, 'password', 'Campo obrigatório')
        Helper.testStatusForField(sut, 'passwordConfirmation', 'Campo obrigatório')
    })

    test('deve chamar o name e testar a falha na validacao', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({validationError})
        Helper.populateField(sut, 'name')
        Helper.testStatusForField(sut, 'name', validationError)
    })
})