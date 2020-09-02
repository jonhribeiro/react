import * as Helper from '../utils/helpers'

describe('Private Routes', () => {
  it('deve sair se a lista não tiver token', () => {
    cy.visit('')
    Helper.testUrl('/login')
  })
})
