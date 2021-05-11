import React, { useEffect, useState } from 'react'
import { stageList } from '../tools/data'
import styles from './siteList.module.scss'

export default function Steps(props) {
  const { stage } = props
  const [curInd, setcurInd] = useState(0)

  useEffect(() => {
    touchCurInd()
  }, [])

  function touchCurInd() {
    stageList.forEach((item, ind) => {
      if (item.gongdiStage === stage) setcurInd(ind)
    })
  }

  return (
    <div className={styles.setpBox}>
      <div className={styles.stepBg}>
        <div className={styles.stepHight} style={{ width: `${((curInd + 1) * 100) / stageList.length}%` }}></div>
      </div>
      <div className={styles.stepList}>
        {stageList.map((item, ind) => {
          const { gongdiStage, gongdiStageName } = item
          const relativeNum = +stage.slice(1) - +gongdiStage.slice(1)
          let cls = ''
          relativeNum > 0 && (cls = 'pass')
          relativeNum === 0 && (cls = 'cur')
          return (
            <span key={gongdiStage} className={styles[cls]}>
              {gongdiStageName}
            </span>
          )
        })}
      </div>
    </div>
  )
}
