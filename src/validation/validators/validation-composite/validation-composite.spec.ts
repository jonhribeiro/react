import { FieldValidationSpy } from "@/validation/test/mock-field-validation"
import { ValidationComposite } from "./validate-composite"


describe('ValidationComposite', () => {
    test('deve retornar erro se alguma validação falhar', () => {
        const fieldValidationspy = new FieldValidationSpy('any_field')
        fieldValidationspy.error = new Error('first_error_message')
        const fieldValidationspy2 = new FieldValidationSpy('any_field')
        fieldValidationspy2.error = new Error('second_error_message')
        const sut = new ValidationComposite([
            fieldValidationspy,
            fieldValidationspy2
        ])
        const error = sut.validate('any_field', 'any_value')
        expect(error).toBe('first_error_message')
    })
})