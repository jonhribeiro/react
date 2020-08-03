import { RequiredFieldValidation } from "./required-field-validation"
import { RequiredFieldError } from "@/validation/errors"
import faker from 'faker'

const makeSut = (): RequiredFieldValidation => new RequiredFieldValidation(faker.database.column()) 

describe('RequiredFieldValidation', () => {
    test('deve retornar erro se o campo estiver vazio', () => {
        const sut = makeSut()
        const error = sut.validate('')
        expect(error).toEqual(new RequiredFieldError())
    })

    test('deve retornar falso se o campo não estiver vazio', () => {
        const sut = makeSut()
        const error = sut.validate(faker.random.word())
        expect(error).toBeFalsy()
    })
})