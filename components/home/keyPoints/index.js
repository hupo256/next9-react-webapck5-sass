import styles from './index.module.css'
import _ from 'lodash'
import Image from 'next/image'

const KeyPoints = ({ pointsList }) => {
  return (
    <div className={styles.featurePoints}>
      {_.map(pointsList, (feature, index) => (
        <div key={index} className={styles.featurePoint}>
          <Image src={feature.imgUrl} layout="fixed" width={64} height={64} />
          <p className={styles.pointTitle}>{feature.title}</p>
          <p className={styles.pointSubTitle}>{feature.description}</p>
        </div>
      ))}
    </div>
  )
}

export default KeyPoints
