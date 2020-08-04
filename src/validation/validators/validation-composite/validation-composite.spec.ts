import { FieldValidationSpy } from "@/validation/test/mock-field-validation"
import { ValidationComposite } from "./validate-composite"


describe('ValidationComposite', () => {
    test('deve retornar erro se alguma validação falhar', () => {
        const fieldValidationspy = new FieldValidationSpy('any_field')
        const fieldValidationspy2 = new FieldValidationSpy('any_field')
        fieldValidationspy2.error = new Error('any_erro_message')
        const sut = new ValidationComposite([
            fieldValidationspy,
            fieldValidationspy2
        ])
        const error = sut.validate('any_field', 'any_value')
        expect(error).toBe('any_erro_message')
    })
})