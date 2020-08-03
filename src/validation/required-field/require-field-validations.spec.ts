import { RequiredFieldValidation } from "./required-field-validation"
import { RequiredFieldError } from "@/validation/errors"

describe('RequiredFieldValidation', () => {
    test('deve retornar erro se o campo estiver vazio', () => {
        const sut = new RequiredFieldValidation('email')
        const error = sut.validate('')
        expect(error).toEqual(new RequiredFieldError())
    })
})