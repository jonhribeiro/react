import { InvalidFieldError } from "@/validation/errors"
import { MinLengthValidation } from "./min-length-validation"
import faker from 'faker'

const makeSut = (): MinLengthValidation => new MinLengthValidation(faker.database.column(), 5) 

describe('MinLengthValidation', () => {
    test('deve retornar erro se o valor for inválido', () => {
        const sut = makeSut()
        const error = sut.validate(faker.random.alphaNumeric(4))
        expect(error).toEqual(new InvalidFieldError())
    })

    test('deve retornar falso se o valor for válido', () => {
        const sut = makeSut()
        const error = sut.validate(faker.random.alphaNumeric(5))
        expect(error).toBeFalsy()
    })
})