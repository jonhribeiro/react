import { FieldValidationSpy } from "@/validation/test/"
import { ValidationComposite } from "./validate-composite"
import faker from 'faker'

type SutTpes = {
    sut: ValidationComposite
    fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (fieldName: string ): SutTpes => {
    const fieldValidationsSpy = [
        new FieldValidationSpy(fieldName),
        new FieldValidationSpy(fieldName)
    ]
    const sut = ValidationComposite.build(fieldValidationsSpy)
    return {
        sut,
        fieldValidationsSpy
    }
}

describe('ValidationComposite', () => {
    test('deve retornar erro se alguma validação falhar', () => {
        const fieldName = faker.database.column()
        const { sut, fieldValidationsSpy } = makeSut(fieldName)
        const errorMessage = faker.random.words()
        fieldValidationsSpy[0].error = new Error(errorMessage)
        fieldValidationsSpy[1].error = new Error(faker.random.words())
        const error = sut.validate(fieldName, { [fieldName]: faker.random.word()})
        expect(error).toBe(errorMessage)
    })

    test('deve testar o caso de sucesso ', () => {
        const fieldName = faker.database.column()
        const { sut } = makeSut(fieldName)
        const error = sut.validate(fieldName, { [fieldName]: faker.random.word()})
        expect(error).toBeFalsy()
    })
})