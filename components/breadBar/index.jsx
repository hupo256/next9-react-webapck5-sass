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
    name: '参观工地',
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
export default function BreadBar(props) {
  const [levalTwo, setlevalTwo] = useState('')
  const [levalTex, setlevalTex] = useState('')

  useEffect(() => {
    touchRoute()
  }, [])

  function touchRoute() {
    const { pathname } = location
    const arr = pathname.split('/')
    // 部署后nginx会在一级路由后面默认加个 /
    // 下面兼容这个场景
    const len = arr.length
    len > 2 && arr[2].includes('details') && setlevalTwo(arr[1])
    setlevalTex(breadData?.[arr[1]]?.name)
  }

  return (
    <div className={styles.breadBox}>
      <span>当前位置：</span>
      <Link href="/">首页</Link> &gt; {` `}
      {levalTwo ? (
        <>
          <Link href={breadData[levalTwo]?.url}>{levalTex}</Link> &gt; <span>{props.curTit}</span>
        </>
      ) : (
        <span>{levalTex}</span>
      )}
    </div>
  )
}
