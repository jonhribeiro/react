import { RequiredFieldValidation } from "@/validation/validators"
import { ValidationBuilder as sut } from "./validation-buiulder"



describe('ValidationBuilder', () => {
    test('deve retornar RequiredFieldValidation', () => {
        const validations = sut.field('any_field').required().build()
        expect(validations).toEqual([new RequiredFieldValidation('any_field')])
    })
})