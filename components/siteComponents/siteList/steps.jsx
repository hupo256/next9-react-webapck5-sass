import React, { useEffect, useState } from 'react'
import styles from './siteList.module.scss'

const stageList = [
  {
    gongdiStage: 'D210312000010',
    gongdiStageName: '开工大吉',
  },
  {
    gongdiStage: 'D210312000011',
    gongdiStageName: '拆改阶段',
  },
  {
    gongdiStage: 'D210312000012',
    gongdiStageName: '水电改造',
  },
  {
    gongdiStage: 'D210312000013',
    gongdiStageName: '泥木工程',
  },
  {
    gongdiStage: 'D210312000014',
    gongdiStageName: '油漆工程',
  },
  {
    gongdiStage: 'D210312000015',
    gongdiStageName: '成品安装',
  },
  {
    gongdiStage: 'D210312000016',
    gongdiStageName: '交付工程',
  },
]

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
