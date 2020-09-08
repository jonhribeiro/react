import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = /surveys/
const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET')
// const mockAccessDeniedError = (): void => Http.mockForbiddenError(path, 'GET')
// const mockSuccess = (): void => Http.mockOk(path, 'GET', 'fix:survey-list')

describe('SurveyResult', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => {
      Helper.setLocalStorageItem('account', account)
    })
  })

  it('deve apresentar erro em UnecpectedError', () => {
    mockUnexpectedError()
    cy.visit('/surveys/any_id')
    cy.getByTestId('error').should('contain.text', 'Algo errado aconteceu. tente novamente mais tarde')
  })

  // it('deve fazer logout AccessDeniedError', () => {
  //   mockAccessDeniedError()
  //   cy.visit('')
  //   Helper.testUrl('/login')
  // })

  // it('deve ter o username na barra', () => {
  //   mockUnexpectedError()
  //   cy.visit('')
  //   const { name } = Helper.getLocalStorageItem('account')
  //   cy.getByTestId('username').should('contain.text', name)
  // })

  // it('deve fazer logout ao clicar no botao', () => {
  //   mockUnexpectedError()
  //   cy.visit('')
  //   cy.getByTestId('logout').click()
  //   Helper.testUrl('/login')
  // })

  // it('deve apresentar itens de pesquisa', () => {
  //   mockSuccess()
  //   cy.visit('')
  //   cy.get('li:empty').should('have.length', 4)
  // })
})
