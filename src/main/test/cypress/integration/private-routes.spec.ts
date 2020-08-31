import * as Helper from '../support/helpers'

describe('Private Routes', () => {
    it('deve sair se a lista não tiver token', () => {
        cy.visit('')
        Helper.testUrl('/login')
    })
})