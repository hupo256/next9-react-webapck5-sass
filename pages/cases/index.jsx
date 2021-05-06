import React, { useContext, useEffect } from 'react'
import { useAppContext } from '@store/index'
import SearchBar from '@components/searchBar'
import CaseList from '@components/caseList'
import Footer from '@components/footer'
import styles from './case.module.scss'

export default function Cases(props) {
  const { companyData, touchCompanyInfor } = useAppContext()

  useEffect(() => {
    touchCompanyInfor()
  }, [])

  return (
    <>
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
      <Footer {...companyData} />
    </>
  )
}
