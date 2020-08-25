import React from 'react'
import Styles from './survey-item-styles.scss'
import { IconName, Icon } from '@/presentation/components'

const SurveyItem: React.FC = () => {

  return (
     <li className={Styles.surveyItemWrap}>
        <div className={Styles.surveyContent}>
            <Icon className={Styles.iconWrap} iconName={IconName.thumbUp} />
            <time>
                <span className={Styles.day}>27</span>
                <span className={Styles.month}>12</span>
                <span className={Styles.year}>2020</span>
            </time>
            <p>Qual seu framework web favorito?</p>
        </div>
        <footer>Ver Resultado</footer>
    </li>
  )
}

export default SurveyItem