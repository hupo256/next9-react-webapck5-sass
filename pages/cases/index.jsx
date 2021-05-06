import React, { useEffect, useState } from 'react'

import SearchBar from '@components/searchBar'
import CaseList from '@components/caseList'
import styles from './case.module.scss'

export default function Cases(props) {
  return (
    <div className={styles.conBox}>
      {/* breadBar */}
      <div className={styles.breadBox}>
        当前位置: <a href="">首页</a> &gt; <a href="">看案例</a>
      </div>

      {/* case */}
      <div className={styles.caseBox}>
        <SearchBar />
        <CaseList />
      </div>
    </div>
  )
}
