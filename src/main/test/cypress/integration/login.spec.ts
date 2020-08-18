import faker from 'faker'
import * as FormHelper from '../support/form-helper'
import * as Http from '../support/login-mocks'

const simulateValidSubmit = (): void => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
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
        FormHelper.testUrl('/login')
    })

    it('deve apresentar erro se forem fornecidas credenciais inválidas error 400, 404, 500 ', () => {
        Http.mockUnexpectedError()
        simulateValidSubmit()
        FormHelper.testMainError('Algo errado aconteceu. tente novamente mais tarde')
        FormHelper.testUrl('/login')
    })
    
    it('deve apresentar UnexpectedError se dados inválidos forem retornados', () => { 
        Http.mockInvalidData()
        simulateValidSubmit()
        FormHelper.testMainError('Algo errado aconteceu. tente novamente mais tarde')
        FormHelper.testUrl('/login')
    })

    it('deve apresentar save accesToken se credenciais válidas forem fornecidas', () => { 
        Http.mockOk()
        simulateValidSubmit()
        cy.getByTestId('error-wrap').should('not.have.descendants')
        FormHelper.testUrl('/')
        FormHelper.testLocalStorageItem('accessToken')
    })

    it('deve previnir varios click no input', () => { 
        Http.mockOk()
        cy.getByTestId('email').focus().type(faker.internet.email())
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
        cy.getByTestId('submit').dblclick()
        FormHelper.testHttpCallsCount(1)

    })

    it('deve previnir click faltando dados no formulario', () => { 
        Http.mockOk()
        cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')
        FormHelper.testHttpCallsCount(0)

    })
})