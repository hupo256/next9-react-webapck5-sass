import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import dynamic from 'next/dynamic'
const SayHi = dynamic(import('fdTest/sayHi'), {
  ssr: false, //这个要加上,禁止使用 SSR
})

// import Loadable from '@components/loading/index'
// const SayHi = Loadable(() => import('fdTest/sayHi'))

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
    name: '设计师',
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
    const len = arr.length
    // 部署后nginx会在一级后默认加个 /
    // 下面兼容这个场景
    const theNum = len > 2 ? 2 : 1
    arr[theNum].includes('details') && setlevalTwo(arr[theNum])
    !arr[theNum].includes('details') && setlevalTex(breadData?.[arr[theNum]]?.name)
  }

  return (
    <div className={styles.breadBox}>
      <SayHi />
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
