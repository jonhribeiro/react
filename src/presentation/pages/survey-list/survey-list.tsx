import React from 'react'
import Styles from './survey-list-styles.scss'
import { Logo, Footer } from '@/presentation/components'

const SurveyList: React.FC = () => {
    return (
        <div className={Styles.surveyListWrap}>
            <header className={Styles.headerWrap}>
                <div className={Styles.headerContent}>
                    <Logo />
                    <div className={Styles.logoutWrap}>
                        <span> Jonh</span>
                        <a href="#">Sair</a>
                    </div>
                </div>
            </header>
            <div className={Styles.contentWrap}>
                <h2>Enquete</h2>
                <ul>
                    <li>
                        <div className={Styles.surveyContent}>
                            <time>
                                <span className={Styles.day}>27</span>
                                <span className={Styles.month}>12</span>
                                <span className={Styles.year}>2020</span>
                            </time>
                            <p>Qual seu framework web favorito?</p>
                        </div>
                        <footer>Ver Resultado</footer>
                    </li>

                    <li>
                        <div className={Styles.surveyContent}>
                            <time>
                                <span className={Styles.day}>27</span>
                                <span className={Styles.month}>12</span>
                                <span className={Styles.year}>2020</span>
                            </time>
                            <p>Qual seu framework web favorito?</p>
                        </div>
                        <footer>Ver Resultado</footer>
                    </li>

                    <li>
                        <div className={Styles.surveyContent}>
                            <time>
                                <span className={Styles.day}>27</span>
                                <span className={Styles.month}>12</span>
                                <span className={Styles.year}>2020</span>
                            </time>
                            <p>Qual seu framework web favorito?</p>
                        </div>
                        <footer>Ver Resultado</footer>
                    </li>

                    <li>
                        <div className={Styles.surveyContent}>
                            <time>
                                <span className={Styles.day}>27</span>
                                <span className={Styles.month}>12</span>
                                <span className={Styles.year}>2020</span>
                            </time>
                            <p>Qual seu framework web favorito?</p>
                        </div>
                        <footer>Ver Resultado</footer>
                    </li>

                    <li>
                        <div className={Styles.surveyContent}>
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