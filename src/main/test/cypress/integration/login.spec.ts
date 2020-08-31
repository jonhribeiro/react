import faker from 'faker'
import * as FormHelper from '../support/form-helper'
import * as Helper from '../support/helpers'
import * as Http from '../support/login-mocks'

const populateFields = (): void => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
}

const simulateValidSubmit = (): void => {
    populateFields()
    cy.getByTestId('submit').click()
}

describe('Login', () => {
    beforeEach(() => {
        cy.visit('login')
    })
    
    it('deve carregar com o estado inicial correto', () => {
        cy.getByTestId('email').should('have.attr', 'readonly')
        FormHelper.testInputStatus('email', 'Campo obrigatório')
        cy.getByTestId('password').should('have.attr', 'readonly')
        FormHelper.testInputStatus('password', 'Campo obrigatório')
        cy.getByTestId('submit').should('have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants') 
    })

    it('deve apresentar erro se o formulário for inválido', () => {
        cy.getByTestId('email').focus().type(faker.random.word())
        FormHelper.testInputStatus('email', 'Valor Invalido')
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
        FormHelper.testInputStatus('password', 'Valor Invalido')
        cy.getByTestId('submit').should('have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants')
    })

    it('deve apresentar caso de sucesso se o formulário for válido', () => {
        cy.getByTestId('email').focus().type(faker.internet.email())
        FormHelper.testInputStatus('email')
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
        FormHelper.testInputStatus('password')
        cy.getByTestId('submit').should('not.have.attr', 'disabled') 
        cy.getByTestId('error-wrap').should('not.have.descendants') 
    })

    it('deve apresentar erro se forem fornecidas credenciais inválidas erro 401', () => {
        Http.mockInvalidCredentialsError()
        simulateValidSubmit()
        FormHelper.testMainError('Credenciais Invalidas')
        Helper.testUrl('/login')
    })

    it('deve apresentar erro se forem fornecidas credenciais inválidas error 400, 404, 500 ', () => {
        Http.mockUnexpectedError()
        simulateValidSubmit()
        FormHelper.testMainError('Algo errado aconteceu. tente novamente mais tarde')
        Helper.testUrl('/login')
    })

    it('deve apresentar save accesToken se credenciais válidas forem fornecidas', () => { 
        Http.mockOk()
        simulateValidSubmit()
        cy.getByTestId('error-wrap').should('not.have.descendants')
        Helper.testUrl('/')
        Helper.testLocalStorageItem('account')
    })

    it('deve previnir varios click no input', () => { 
        Http.mockOk()
        populateFields()
        cy.getByTestId('submit').dblclick()
        Helper.testHttpCallsCount(1)

    })

    it('deve previnir click faltando dados no formulario', () => { 
        Http.mockOk()
        cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')
        Helper.testHttpCallsCount(0)

    })
})