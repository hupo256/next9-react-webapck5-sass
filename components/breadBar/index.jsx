import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './breadBar.module.scss'

const breadData = {
  cases: {
    url: '/cases',
    name: '装修案例',
  },
  sites: {
    url: '/sites',
    name: '工地直播',
  },
  designers: {
    url: '/designers',
    name: '找设计师',
  },
  articles: {
    url: '/articles',
    name: '装修攻略',
  },
}
export default function Footer(props) {
  const [levalTwo, setlevalTwo] = useState('')
  const [levalTex, setlevalTex] = useState('')

  useEffect(() => {
    touchRoute()
  }, [])

  function touchRoute() {
    const { pathname } = location
    const arr = pathname.split('/')
    const len = arr.length
    len > 2 && setlevalTwo(arr[1])
    len === 2 && setlevalTex(breadData[arr[1]].name)
  }

  return (
    <div className={styles.breadBox}>
      <span>当前位置：</span>
      <Link href="/">首页</Link> &gt; {` `}
      {levalTwo ? (
        <>
          <Link href={breadData[levalTwo].url}>{breadData[levalTwo].name}</Link> &gt; <span>{props.curTit}</span>
        </>
      ) : (
        <span>{levalTex}</span>
      )}
    </div>
  )
}
