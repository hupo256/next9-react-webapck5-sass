import React, { useEffect, useState } from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import styles from './siteList.module.scss'

export default function Steps(props) {
  const { stage, dicList } = props
  const [curInd, setcurInd] = useState(0)
  const [stepNub, setstepNub] = useState(0)
  const [detNum, setdetNum] = useState(0)
  const dLen = dicList.length

  useEffect(() => {
    touchCurInd()
    setdetNum(touchdetNum())
  }, [])

  function touchCurInd() {
    dicList.forEach((item, ind) => {
      if (item.code === stage) setcurInd(ind)
    })
  }

  function touchdetNum() {
    const twidth = (68 * dLen - 700) / 68
    const num = Math.floor(twidth)
    return num > 0 ? num : 0
  }

  function toLeft(e) {
    e.stopPropagation()
    if (stepNub === 0) return
    setstepNub(stepNub + 1)
  }

  function toRight(e) {
    e.stopPropagation()
    if (detNum + 1 === -stepNub) return
    setstepNub(stepNub - 1)
  }

  return (
    <div className={styles.stepOut}>
      <div className={styles.setpBox} style={{ transform: `translateX(${stepNub * 68}px)` }}>
        <div className={styles.stepBg} style={{ width: `${68 * dLen}px` }}>
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

      <div className={styles.directionBox}>
        <a disabled={stepNub === 0} onClick={e => toLeft(e)}>
          <LeftOutlined />
        </a>
        <a disabled={detNum + 1 === -stepNub} onClick={e => toRight(e)}>
          <RightOutlined />
        </a>
      </div>
    </div>
  )
}
