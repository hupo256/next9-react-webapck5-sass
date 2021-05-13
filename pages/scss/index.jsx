// import Article from '@components/articles'
// export default () => <Article />

import React, { useState, useEffect } from 'react'
import BasicLayout from '@components/HomePageLayout'

import styles from './articles.module.scss'

export default function Acticle(props) {
  const [value, setvalue] = useState('11')

  useEffect(() => {
    setvalue('  WWEE')
  }, [])

  return (
    <BasicLayout title="文章">
      test {value}
      <div className={styles.conBox}>{value}</div>
    </BasicLayout>
  )
}
