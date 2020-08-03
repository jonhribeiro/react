import { FieldValidation } from "@/validation/protocols/field-validation"
import { InvalidFieldError } from "@/validation/errors"

export class EmailValidation implements FieldValidation {
    constructor (readonly field: string) {}

    validate (value: string): Error {
        const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        // verificar se o email esta vazio por q pode mandar email em branco
        return (!value || emailRegex.test(value)) ? null :  new InvalidFieldError()
    }
}
