import { RequiredFieldValidation, EmailValidation } from "@/validation/validators"
import { ValidationBuilder as sut } from "./validation-buiulder"



describe('ValidationBuilder', () => {
    test('deve retornar RequiredFieldValidation', () => {
        const validations = sut.field('any_field').required().build()
        expect(validations).toEqual([new RequiredFieldValidation('any_field')])
    })

    test('deve retornar EmailValidation', () => {
        const validations = sut.field('any_field').email().build()
        expect(validations).toEqual([new EmailValidation('any_field')])
    })
})