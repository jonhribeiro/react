import Styles from './survey-list-styles.scss'
import { Header, Footer } from '@/presentation/components'
import { SurveyItemEmpty, SurveyItem } from '@/presentation/pages/survey-list/components'
import { LoadSurveyList } from '@/domain/usercases'
import React, { useEffect, useState } from 'react'
import { SurveyModel } from '@/domain/models'

type Props = {
    loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({loadSurveyList}: Props) => {
    const [state, setstate] = useState({
        surveys: [] as SurveyModel[],
        error: ''
    })

    useEffect(() => {
        loadSurveyList.loadAll()
        .then(surveys => setstate({ ...state, surveys }))
        .catch(error => setstate({ ...state, error: error.message }))
    }, [])

    return (
        <div className={Styles.surveyListWrap}>
            <Header />
            <div className={Styles.contentWrap}>
                <h2>Enquetes</h2>
                {state.error
                    ? <div>
                        <span data-testid="error">{state.error}</span>
                        <button>Recarregar</button>
                    </div>
                    : <ul data-testid="survey-list">
                        {state.surveys.length
                            ? state.surveys.map((survey: SurveyModel) => <SurveyItem key={survey.id} survey={survey} />)
                            : <SurveyItemEmpty />
                        }
                    </ul>
                }
                
            </div>
            <Footer />
        </div>
    )
}

export default SurveyList