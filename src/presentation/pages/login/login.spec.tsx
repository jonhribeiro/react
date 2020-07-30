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
    })
})