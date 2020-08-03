import { InvalidFieldError } from "@/validation/errors"
import { MinLengthValidation } from "./min-length-validation"

describe('MinLengthValidation', () => {
    test('deve retornar erro se o valor for inválido', () => {
        const sut = new MinLengthValidation('field', 5)
        const error = sut.validate('123')
        expect(error).toEqual(new InvalidFieldError())
    })
})