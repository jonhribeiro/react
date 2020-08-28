import React from 'react'
import { render, screen, waitFor, fireEvent} from '@testing-library/react'
import { SurveyList } from '@/presentation/pages'
import { LoadSurveyList } from '@/domain/usercases'
import { mockSurveyListModel } from '@/domain/test'
import { UnexpectedError } from '@/domain/errors'
import { ApiContext } from '@/presentation/contexts'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

class LoadSurveyListSpy implements LoadSurveyList {
    callsCount = 0
    surveys = mockSurveyListModel()
    async loadAll (): Promise<LoadSurveyList.Model[]> {
        this.callsCount++
        return this.surveys
    }
}

type SutTypes = {
    loadSurveyListSpy: LoadSurveyListSpy
}

const makesut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
    render(
      <ApiContext.Provider value={{ setCurrentAccount: jest.fn() }}>
        <Router history={createMemoryHistory()}>
          <SurveyList loadSurveyList={loadSurveyListSpy} />
        </Router>
      </ApiContext.Provider>
      
      )
    return {
        loadSurveyListSpy
    }
}

describe('SurveyList Componente', () => {
  test('testando o estado inicial da pagina com 4 itens', async () => {
    makesut()
    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
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
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })

  test('deve renderizar o erro em caso de falha', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error)
    makesut(loadSurveyListSpy)
    await waitFor(() => screen.getByRole('heading'))
    expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
    expect(screen.getByTestId('error')).toHaveTextContent(error.message)
  })

  test('deve renderizar o LoadSurveyList quando clicar no botao recarregar', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new UnexpectedError())
    makesut(loadSurveyListSpy)
    await waitFor(() => screen.getByRole('heading'))
    fireEvent.click(screen.getByTestId('reload'))
    expect(loadSurveyListSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByRole('heading'))
  })
})
