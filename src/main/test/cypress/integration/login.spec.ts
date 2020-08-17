import faker from 'faker'

const baseUrl: string = Cypress.config().baseUrl

describe('Login', () => {
    beforeEach(() => {
        cy.server()
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

    it('deve apresentar erro se forem fornecidas credenciais inválidas erro 401', () => {
        cy.route({
            method: 'POST',
            url: /login/,
            status: 401,
            response: {
                error: faker.random.words()
                
            }
        })
        cy.getByTestId('email').focus().type(faker.internet.email())
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
        cy.getByTestId('submit').click()
        cy.getByTestId('spinner').should('not.exist')
        cy.getByTestId('main-error').should('contain.text', 'Credenciais Invalidas')
        cy.url().should('eq', `${baseUrl}/login`)
    })

    it('deve apresentar erro se forem fornecidas credenciais inválidas erro 400', () => {
        cy.route({
            method: 'POST',
            url: /login/,
            status: 400,
            response: {
                error: faker.random.words()
                
            }
        })
        cy.getByTestId('email').focus().type(faker.internet.email())
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
        cy.getByTestId('submit').click()
        cy.getByTestId('spinner').should('not.exist')
        cy.getByTestId('main-error').should('contain.text', 'Algo errado aconteceu. tente novamente mais tarde')
        cy.url().should('eq', `${baseUrl}/login`)
    })
    
    it('deve apresentar UnexpectedError se dados inválidos forem retornados', () => { 
        cy.route({
            method: 'POST',
            url: /login/,
            status: 200,
            response: {
                invalidProperty: faker.random.uuid()
                
            }
        })
        cy.getByTestId('email').focus().type(faker.internet.email())
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
        cy.getByTestId('submit').click()
        cy.getByTestId('spinner').should('not.exist')
        cy.getByTestId('main-error').should('contain.text', 'Algo errado aconteceu. tente novamente mais tarde')
        cy.url().should('eq', `${baseUrl}/login`)
    })

    it('deve apresentar save accesToken se credenciais válidas forem fornecidas', () => { 
        cy.route({
            method: 'POST',
            url: /login/,
            status: 200,
            response: {
                accessToken: faker.random.uuid()
                
            }
        })
        cy.getByTestId('email').focus().type('mango@gmail.com')
        cy.getByTestId('password').focus().type('12345')
        cy.getByTestId('submit').click()
        cy.getByTestId('main-error').should('not.exist')
        cy.getByTestId('spinner').should('not.exist')
        cy.url().should('eq', `${baseUrl}/`)
        cy.window().then(window => assert.isOk(window.localStorage.getItem('accessToken')))
    })
})