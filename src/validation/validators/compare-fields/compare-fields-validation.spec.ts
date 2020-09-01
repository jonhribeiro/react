import { CompareFieldsValidation } from './compare-fields-validation'
import { InvalidFieldError } from '@/validation/errors'
import faker from 'faker'

const makeSut = (field: string, fieldToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(field, fieldToCompare) 

describe('CompareFieldsValidation', () => {
    test('deve retornar erro se comparar for inválido', () => {
        const field = faker.database.column()
        const fieldToCompare = faker.database.column()
        const sut = makeSut(field, fieldToCompare)
        const error = sut.validate({
            [field]: 'any_values',
            [fieldToCompare]: 'other_value'
        })
        expect(error).toEqual(new InvalidFieldError())
    })

    test('deve retornar falso se comparar for válido', () => {
        const field = faker.database.column()
        const fieldToCompare = faker.database.column()
        const value = faker.random.words()
        const sut = makeSut(field, fieldToCompare)
        const error = sut.validate({
            [field]: value,
            [fieldToCompare]: value
        })
        expect(error).toBeFalsy()
    })
})