import { EmailValidation } from './email-validation'
import { InvalidFieldError } from '@/validation/errors'
import faker from 'faker'

const makeSut = (field: string): EmailValidation => new EmailValidation(field)

describe('EmailValidation', () => {
  const field = faker.database.column()
  test('deve retornar erro se o email for inválido', () => {
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('deve retornar falso se o email for válido', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.internet.email() })
    expect(error).toBeFalsy()
  })

  test('deve retornar falso se o email estiver vazio', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: '' })
    expect(error).toBeFalsy()
  })
})
