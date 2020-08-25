import Styles from './survey-list-styles.scss'
import { Header, Footer } from '@/presentation/components'
import { SurveyContext, SurveyListItem, SurveyError } from '@/presentation/pages/survey-list/components'
import { LoadSurveyList } from '@/domain/usercases'
import React, { useEffect, useState } from 'react'
import { SurveyModel } from '@/domain/models'

type Props = {
    loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({loadSurveyList}: Props) => {
    const [state, setState] = useState({
        surveys: [] as SurveyModel[],
        error: ''
    })

    useEffect(() => {
        loadSurveyList.loadAll()
        .then(surveys => setState({ ...state, surveys }))
        .catch(error => setState({ ...state, error: error.message }))
    }, [])

    return (
        <div className={Styles.surveyListWrap}>
            <Header />
            <div className={Styles.contentWrap}>
                <h2>Enquetes</h2>
                <SurveyContext.Provider value={{ state, setState }}>
                    { state.error ? < SurveyError /> : <SurveyListItem /> }
                </SurveyContext.Provider>
            </div>
            <Footer />
        </div>
    )
}

export default SurveyList