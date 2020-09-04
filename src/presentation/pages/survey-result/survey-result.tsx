import Styles from './survey-result-styles.scss'
import { Header, Footer, Loading, Calendar, Error } from '@/presentation/components'
import { LoadSurveyResult } from '@/domain/usercases'
import FlipMove from 'react-flip-move'
import React, { useState } from 'react'

const SurveyResult: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model
  })
  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div data-testid="survey-result" className={Styles.contentWrap}>
        {state.surveyResult &&
        <>
          <hgroup>
            <Calendar date={ new Date() } className={Styles.calendarWrap} />
            <h2>Qual e o seu prato predilecto ? Diz ai quero saber e quero tambem</h2>
          </hgroup>
          <FlipMove className={Styles.answersList}>
            <li>
              <img src="http://fordevs.herokuapp.com/static/img/logo-react.png"/>
              <span className={Styles.answer}>ReactJs</span>
              <span className={Styles.percent}>50%</span>
            </li>
            <li className={Styles.active}>
              <img src="http://fordevs.herokuapp.com/static/img/logo-react.png"/>
              <span className={Styles.answer}>ReactJs</span>
              <span className={Styles.percent}>50%</span>
            </li>
            <li>
              <img src="http://fordevs.herokuapp.com/static/img/logo-react.png"/>
              <span className={Styles.answer}>ReactJs</span>
              <span className={Styles.percent}>50%</span>
            </li>
          </FlipMove>
          <button>Voltar</button>
        </>
        }
        { state.isLoading && <Loading /> }
        { state.error && <Error error={state.error} reload={() => {}} /> }
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
