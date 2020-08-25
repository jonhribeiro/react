import { SurveyItem } from '@/presentation/pages/survey-list/components'
import { render, screen} from '@testing-library/react'
import { mockSurveyModel } from '@/domain/test'
import { IconName } from '@/presentation/components'
import React from 'react'

describe('SurveyItem Componente', () => {
  test('renderizar o componete com valores correto', () => {
    const survey = mockSurveyModel()
    survey.diaAnswer = true
    survey.date = new Date('2020-08-25T00:00:00')
    render(<SurveyItem survey={survey} />)
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp )
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('25')
    expect(screen.getByTestId('month')).toHaveTextContent('ago')
    expect(screen.getByTestId('year')).toHaveTextContent('2020') 
  })
})
