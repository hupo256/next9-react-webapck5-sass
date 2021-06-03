import React, { useEffect, useState } from 'react'
import styles from './siteList.module.scss'

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
      <div className={styles.stepBg} style={{ width: `${68 * dLen - 20}px` }}>
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
