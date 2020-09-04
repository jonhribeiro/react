import { render, screen } from '@testing-library/react'
import { SurveyResult } from '@/presentation/pages'
import { ApiContext } from '@/presentation/contexts'
import { mockAccountModel } from '@/domain/test'
import React from 'react'

describe('SurveyResult Component', () => {
  test('testando o estado inicial da pagina', () => {
    render(
      <ApiContext.Provider value={{ setCurrentAccount: jest.fn(), getCurrentAccount: () => mockAccountModel() }}>
        <SurveyResult />
      </ApiContext.Provider>

    )
    const surveyResult = screen.getByTestId('survey-result')
    expect(surveyResult.childElementCount).toBe(0)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  })
})
