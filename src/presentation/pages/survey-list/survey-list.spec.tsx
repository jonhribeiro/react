import React from 'react'
import { render, screen, waitFor, getByRole} from '@testing-library/react'
import { SurveyList } from '@/presentation/pages'
import { LoadSurveyList } from '@/domain/usercases'
import { SurveyModel } from '@/domain/models'
import { mockSurveyListModel } from '@/domain/test'

class LoadSurveyListSpy implements LoadSurveyList {
    callsCount = 0
    surveys = mockSurveyListModel()
    async loadAll (): Promise<SurveyModel[]> {
        this.callsCount++
        return this.surveys
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
  test('testando o estado inicial da pagina com 4 itens', async () => {
    makesut()
    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
    await waitFor(() => surveyList)
  })

  test('deve chamar LoadSurveyList ', async () => {
    const { loadSurveyListSpy } = makesut()
    expect(loadSurveyListSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByRole('heading'))
  })

  test('deve chamar LoadSurveyList caso de sucesso', async () => {
    makesut()
    const surveyList = screen.getByTestId('survey-list')
    await waitFor(() => surveyList)
    expect(surveyList.querySelectorAll('li.surveyItemWrap')).toHaveLength(3)
  })
})
