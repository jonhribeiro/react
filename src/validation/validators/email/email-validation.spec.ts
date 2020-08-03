import { EmailValidation } from "./email-validation"
import { InvalidFieldError } from "@/validation/errors"
import faker from 'faker'

const makeSut = (): EmailValidation => new EmailValidation(faker.database.column()) 

describe('EmailValidation', () => {
    test('deve retornar erro se o email for inválido', () => {
        const sut = makeSut()
        const error = sut.validate(faker.random.word())
        expect(error).toEqual(new InvalidFieldError())
    })
    
    test('deve retornar falso se o email for válido', () => {
        const sut = makeSut()
        const error = sut.validate(faker.internet.email())
        expect(error).toBeFalsy()
    })
    
    test('deve retornar falso se o email estiver vazio', () => {
        const sut = makeSut()
        const error = sut.validate('')
        expect(error).toBeFalsy()
    })
})