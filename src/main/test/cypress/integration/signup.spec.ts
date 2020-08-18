import * as FormHelper from '../support/form-helper'
import faker from 'faker'

describe('SignUp', () => {
    beforeEach(() => {
        cy.visit('signup')
    })
    
    it('deve carregar com o estado inicial correto', () => {
        cy.getByTestId('name').should('have.attr', 'readonly')
        FormHelper.testInputStatus('name', 'Campo obrigatório')
        cy.getByTestId('email').should('have.attr', 'readonly')
        FormHelper.testInputStatus('email', 'Campo obrigatório')
        cy.getByTestId('password').should('have.attr', 'readonly')
        FormHelper.testInputStatus('password', 'Campo obrigatório')
        cy.getByTestId('passwordConfirmation').should('have.attr', 'readonly')
        FormHelper.testInputStatus('passwordConfirmation', 'Campo obrigatório')
        cy.getByTestId('submit').should('have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants') 
    })

    
    it('deve apresentar erro se o formulário for inválido', () => {
        cy.getByTestId('name').focus().type(faker.random.alphaNumeric(3))
        FormHelper.testInputStatus('name', 'Valor Invalido')
        cy.getByTestId('email').focus().type(faker.random.word())
        FormHelper.testInputStatus('email', 'Valor Invalido')
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
        FormHelper.testInputStatus('password', 'Valor Invalido')
        cy.getByTestId('passwordConfirmation').focus().type(faker.random.alphaNumeric(4))
        FormHelper.testInputStatus('passwordConfirmation', 'Valor Invalido')
        cy.getByTestId('submit').should('have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants')
    })
    
    it('deve apresentar caso de sucesso se o formulário for válido', () => {
        cy.getByTestId('name').focus().type(faker.name.findName()) 
        FormHelper.testInputStatus('name')
        cy.getByTestId('email').focus().type(faker.internet.email())
        FormHelper.testInputStatus('email')
        const password = faker.random.alphaNumeric(5)
        cy.getByTestId('password').focus().type(password)
        FormHelper.testInputStatus('password')
        cy.getByTestId('passwordConfirmation').focus().type(password)
        FormHelper.testInputStatus('passwordConfirmation')
        cy.getByTestId('submit').should('not.have.attr', 'disabled') 
        cy.getByTestId('error-wrap').should('not.have.descendants') 
    })
})