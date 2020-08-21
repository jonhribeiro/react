import React from 'react'
import { render } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import PrivateRoute from './private-route'
import { ApiContext } from '@/presentation/contexts'
import { mockAcountModel } from '@/domain/test'

type SutTypes = {
    history: MemoryHistory
}

const makeSut = (account = mockAcountModel()): SutTypes => {
    const history = createMemoryHistory({ initialEntries: ['/'] })
    render(
        <ApiContext.Provider value={{ getCurrentAccount: () => account }} >
            <Router history={history}>
                <PrivateRoute />
            </Router>
        </ApiContext.Provider>
    )
    return { history }
}

describe('PrivateRoute', () => {
    test('Rediricionar para logim se nao tiver o token de acesso', () => {
        const { history } = makeSut(null)
        expect(history.location.pathname).toBe('/login')
    })

    test('deve renderizar o componente atual se o token não estiver vazio', () => {
        const { history } = makeSut()
        expect(history.location.pathname).toBe('/')
    })
})