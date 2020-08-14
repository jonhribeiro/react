describe('Login', () => {
    beforeEach(() => {
        cy.visit('login')
    })
    it('deve carregar com o estado inicial correto', () => {
        cy.getByTestId('email-status').should('have.attr', 'title', 'Campo obrigatório')
    })
})