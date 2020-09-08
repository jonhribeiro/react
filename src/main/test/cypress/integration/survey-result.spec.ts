import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = /surveys/
const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET')

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
})
