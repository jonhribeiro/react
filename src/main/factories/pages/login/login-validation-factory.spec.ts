import { makeLoginValidation } from '@/main/factories/pages'
import { ValidationComposite, RequiredFieldValidation, EmailValidation, MinLengthValidation } from "@/validation/validators"

describe('LoginValidationFactory', () => {
    test('deve makeValidationComposite com validações corretas', () => {
        const composite = makeLoginValidation()
        expect(composite).toEqual(ValidationComposite.build([
            new RequiredFieldValidation('email'),
            new EmailValidation('email'),
            new RequiredFieldValidation('password'),
            new MinLengthValidation('password', 5)
        ]))

    })
})