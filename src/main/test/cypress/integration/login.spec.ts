import faker from 'faker'

describe('Login', () => {
    beforeEach(() => {
        cy.visit('login')
    })
    
    it('deve carregar com o estado inicial correto', () => {
        cy.getByTestId('email').should('have.attr', 'readonly')
        cy.getByTestId('email-status')
            .should('have.attr', 'title', 'Campo obrigatório')
            .should('contain.text', '🔴')
        cy.getByTestId('password').should('have.attr', 'readonly')
        cy.getByTestId('password-status')
            .should('have.attr', 'title', 'Campo obrigatório')
            .should('contain.text', '🔴')
        cy.getByTestId('submit').should('have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants')
    })

    it('deve apresentar erro se o formulário for inválido', () => {
        cy.getByTestId('email').focus().type(faker.random.word())
        cy.getByTestId('email-status')
            .should('have.attr', 'title', 'Valor Invalido')
            .should('contain.text', '🔴')
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
        cy.getByTestId('password-status')
            .should('have.attr', 'title', 'Valor Invalido')
            .should('contain.text', '🔴')
        cy.getByTestId('submit').should('have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants')
    })

    it('deve apresentar caso de sucesso se o formulário for válido', () => {
        cy.getByTestId('email').focus().type(faker.internet.email())
        cy.getByTestId('email-status')
            .should('have.attr', 'title', 'Tudo certo!')
            .should('contain.text', '🟢')
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
        cy.getByTestId('password-status')
            .should('have.attr', 'title', 'Tudo certo!')
            .should('contain.text', '🟢')
        cy.getByTestId('submit').should('not.have.attr', 'disabled') 
        cy.getByTestId('error-wrap').should('not.have.descendants') 
    })
})