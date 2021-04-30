import React, { useEffect, useState } from 'react'
import { useAppContext } from '@store/index'
import caseApi from '@service/caseApi'

import SearchBar from '@components/searchBar'
import CaseList from '@components/caseList'
import styles from './case.module.scss'

export default function Cases(props) {
  const { searchTags, caseData } = useAppContext()

  function touchDetails() {
    caseApi.getCaseByUidForWeb({ uid: '8027af336e8f449c9f91dfd2fbe5cdeb' }).then(res => {
      console.log(res)
    })
  }

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
