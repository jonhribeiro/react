import { FieldValidationSpy } from "@/validation/test/mock-field-validation"
import { ValidationComposite } from "./validate-composite"

type SutTpes = {
    sut: ValidationComposite
    fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (): SutTpes => {
    const fieldValidationsSpy = [
        new FieldValidationSpy('any_field'),
        new FieldValidationSpy('any_field')
    ]
    const sut = new ValidationComposite(fieldValidationsSpy)
    return {
        sut,
        fieldValidationsSpy
    }
}

describe('ValidationComposite', () => {
    test('deve retornar erro se alguma validação falhar', () => {
        const { sut, fieldValidationsSpy } = makeSut()
        fieldValidationsSpy[0].error = new Error('first_error_message')
        fieldValidationsSpy[1].error = new Error('second_error_message')
        const error = sut.validate('any_field', 'any_value')
        expect(error).toBe('first_error_message')
    })
})