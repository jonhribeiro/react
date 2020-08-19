import React from 'react'
import Styles from './survey-list-styles.scss'
import { Header, Footer, Icon, IconName } from '@/presentation/components'

const SurveyList: React.FC = () => {
    return (
        <div className={Styles.surveyListWrap}>
            <Header />
            <div className={Styles.contentWrap}>
                <h2>Enquete</h2>
                <ul>
                    <li>
                        <div className={Styles.surveyContent}>
                            <Icon className={Styles.iconWrap} iconName={IconName.thumbDown} />
                            <time>
                                <span className={Styles.day}>27</span>
                                <span className={Styles.month}>12</span>
                                <span className={Styles.year}>2020</span>
                            </time>
                            <p>Qual seu framework web favorito?</p>
                        </div>
                        <footer>Ver Resultado</footer>
                    </li>
                </ul>
            </div>
            <Footer />
        </div>
    )
}

export default SurveyList