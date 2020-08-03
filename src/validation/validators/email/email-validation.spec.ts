import { EmailValidation } from "./email-validation"
import { InvalidFieldError } from "@/validation/errors"

describe('EmailValidation', () => {
    test('deve retornar erro se o email for inválido', () => {
        const sut = new EmailValidation('email')
        const error = sut.validate('')
        expect(error).toEqual(new InvalidFieldError())
    })
})