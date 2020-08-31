import * as Helper from '../support/helpers'
import * as Http from '../support/survey-list-mocks'
import faker from 'faker'


describe('SurveyList', () => {
    beforeEach(() => {
        Helper.setLocalStorageItem('account', { accessToken: faker.random.uuid(), name: faker.name.findName() })
    })
    
    it('deve apresentar erro em UnecpectedError', () => {
        Http.mockUnexpectedError()
        cy.visit('')
        cy.getByTestId('error').should('contain.text', 'Algo errado aconteceu. tente novamente mais tarde')
    })
    
    it('deve fazer logout AccessDeniedError', () => {
        Http.mockAccessDeniedError()
        cy.visit('')
        Helper.testUrl('/login')
    })
    
    it('deve ter o username na barra', () => {
        Http.mockUnexpectedError()
        cy.visit('')
        const { name } = Helper.getLocalStorageItem('account')
        cy.getByTestId('username').should('contain.text', name)
    })
    
    it('deve fazer logout ao clicar no botao', () => {
        Http.mockUnexpectedError()
        cy.visit('')
        cy.getByTestId('logout').click()
        Helper.testUrl('/login')
    })
})