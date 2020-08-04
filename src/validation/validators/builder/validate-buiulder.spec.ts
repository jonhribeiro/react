import { RequiredFieldValidation, EmailValidation, MinLengthValidation } from "@/validation/validators"
import { ValidationBuilder as sut } from "./validation-buiulder"
import faker from 'faker'

describe('ValidationBuilder', () => {
    test('deve retornar RequiredFieldValidation', () => {
        const field = faker.database.column()
        const validations = sut.field(field).required().build()
        expect(validations).toEqual([new RequiredFieldValidation(field)])
    })

    test('deve retornar EmailValidation', () => {
        const field = faker.database.column()
        const validations = sut.field(field).email().build()
        expect(validations).toEqual([new EmailValidation(field)])
    })

    test('deve retornar MinLengthValidation', () => {
        const field = faker.database.column()
        const length = faker.random.number()
        const validations = sut.field(field).min(length).build()
        expect(validations).toEqual([new MinLengthValidation(field, length)])
    })

    test('deve retornar uma lista de validações', () => {
        const field = faker.database.column()
        const length = faker.random.number()
        const validations = sut.field(field).required().min(length).email().build()
        expect(validations).toEqual([
            new RequiredFieldValidation(field),
            new MinLengthValidation(field, length),
            new EmailValidation(field)
        ])
    })
})