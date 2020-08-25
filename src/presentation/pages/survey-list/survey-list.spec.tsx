import React from 'react'
import { render, screen} from '@testing-library/react'
import { SurveyList } from '@/presentation/pages'

const makesut = (): void => {
    render(<SurveyList />)
}

describe('SurveyList Componente', () => {
  test('testando o estado inicial da pagina com 4 itens', () => {
    makesut()
    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4)
  })
})
