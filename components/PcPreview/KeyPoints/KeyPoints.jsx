import styles from './KeyPoints.module.scss'
import _ from 'lodash'

import { typeMap, paramMap } from '@libs/constants.js'

const KeyPoints = ({ pointsList }) => {
  return (
    <div className={styles.featurePoints}>
      {_.map(pointsList, (feature, index) => (
        <div
          key={index}
          className={styles.featurePoint}
          onClick={() =>
            (window.location.href = `/${typeMap[feature.type]}/details?${paramMap[feature.type]}=${feature.uid}`)
          }
          style={{ cursor: 'pointer' }}
        >
          <img src={feature.icon} />
          <p className={styles.pointTitle}>{feature.title}</p>
          <p className={styles.pointSubTitle}>{feature.desc}</p>
        </div>
      ))}
    </div>
  )
}

export default KeyPoints
