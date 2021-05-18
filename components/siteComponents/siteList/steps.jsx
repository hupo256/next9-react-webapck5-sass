import React, { useEffect, useState } from 'react'
import styles from './siteList.module.scss'

const dicList = [
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
  const { stage, dicList } = props
  const [curInd, setcurInd] = useState(0)
  const dLen = dicList.length

  useEffect(() => {
    touchCurInd()
  }, [])

  function touchCurInd() {
    dicList.forEach((item, ind) => {
      if (item.code === stage) setcurInd(ind)
    })
  }

  return (
    <div className={styles.setpBox}>
      <div className={styles.stepBg}>
        <div className={styles.stepHight} style={{ width: `${((curInd + 1) * 100) / dLen}%` }}></div>
      </div>
      <div className={styles.stepList}>
        {dicList.map((item, ind) => {
          const { code, name } = item
          const relativeNum = curInd - ind
          let cls = ''
          relativeNum > 0 && (cls = 'pass')
          relativeNum === 0 && (cls = 'cur')
          return (
            <span key={code} className={styles[cls]}>
              {name}
            </span>
          )
        })}
      </div>
    </div>
  )
}
