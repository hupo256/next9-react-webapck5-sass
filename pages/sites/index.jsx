import React, { useEffect, useState } from 'react'
import { useAppContext } from '@store/index'
import { CaseWrapper } from '@store/cases'
import SearchBar from '@components/searchBar'
import BreadBar from '@components/breadBar'
import Footer from '@components/footer'
import SiteList from './siteList'
import styles from './site.module.scss'

function Sites(props) {
  const { companyData, touchCompanyInfor } = useAppContext()

  useEffect(() => {
    touchCompanyInfor()
    // touchDiaryList()
    // touchPageTree()
  }, [])

  return (
    <>
      <div className={styles.conBox}>
        {/* breadBar */}
        <BreadBar />

        {/* sites */}
        <div className={styles.siteBox}>
          <SearchBar from="sites" />
          <SiteList from="sites" />
        </div>
      </div>
      <Footer {...companyData} />
    </>
  )
}

export default props => (
  <CaseWrapper>
    <Sites {...props} />
  </CaseWrapper>
)
