import React from 'react'
import { render } from '@testing-library/react'
import Login from './login'

describe('login componente', () => {
    test('devemos não renderiza gerando erro no início e com o button desabilitado', () => {
        const { getByTestId } = render(<Login />)
        const errorWrap = getByTestId('error-wrap')
        expect(errorWrap.childElementCount).toBe(0)
        const submitButton = getByTestId('submit') as HTMLButtonElement
        expect(submitButton.disabled).toBe(true)
        const emailStatus = getByTestId('email-status')
        expect(emailStatus.title).toBe('Campo obrigatório')
        expect(emailStatus.textContent).toBe('🔴')
        const passwordStatus = getByTestId('password-status')
        expect(passwordStatus.title).toBe('Campo obrigatório')
        expect(passwordStatus.textContent).toBe('🔴')
    })
})