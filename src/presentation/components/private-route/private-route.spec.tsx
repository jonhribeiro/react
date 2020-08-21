import React from 'react'
import { render } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import PrivateRoute from './private-route'

describe('PrivateRoute', () => {
    test('Rediricionar para logim se nao tiver o token de acesso', () => {
        const history = createMemoryHistory({ initialEntries: ['/'] })
        render(
            <Router history={history}>
                <PrivateRoute />
            </Router>
        )
        expect(history.location.pathname).toBe('/login')
    })
})