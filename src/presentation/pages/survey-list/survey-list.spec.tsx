import React from 'react'
import { render, screen} from '@testing-library/react'
import { SurveyList } from '@/presentation/pages'
import { LoadSurveyList } from '@/domain/usercases'
import { SurveyModel } from '@/domain/models'
import { type } from 'os'

class LoadSurveyListSpy implements LoadSurveyList {
    callsCount = 0
    async loadAll (): Promise<SurveyModel[]> {
        this.callsCount++
        return []
    }
}

type SutTypes = {
    loadSurveyListSpy: LoadSurveyListSpy
}

const makesut = (): SutTypes => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    render(<SurveyList loadSurveyList={loadSurveyListSpy} />)
    return {
        loadSurveyListSpy
    }
}

describe('SurveyList Componente', () => {
  test('testando o estado inicial da pagina com 4 itens', () => {
    makesut()
    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4)
  })

  test('deve chamar LoadSurveyList index', () => {
    const { loadSurveyListSpy } = makesut()
    expect(loadSurveyListSpy.callsCount).toBe(1)
  })
})
