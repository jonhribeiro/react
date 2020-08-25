import { SurveyItem } from '@/presentation/pages/survey-list/components'
import { render, screen} from '@testing-library/react'
import { mockSurveyModel } from '@/domain/test'
import { IconName } from '@/presentation/components'
import React from 'react'

const makeSut = (survey = mockSurveyModel()): void => {
    render(<SurveyItem survey={survey} />)
}

describe('SurveyItem Componente', () => {
  test('renderizar o componete com valores correto', () => {
    const survey = Object.assign(mockSurveyModel(), {
        diaAnswer: true,
        date: new Date('2020-08-25T00:00:00')
    })
    render(<SurveyItem survey={survey} />)
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp )
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('25')
    expect(screen.getByTestId('month')).toHaveTextContent('ago')
    expect(screen.getByTestId('year')).toHaveTextContent('2020') 
  })
})
