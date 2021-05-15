import React, { useEffect } from 'react'
import BasicLayout from '@components/HomePageLayout'
import { CaseWrapper } from '@store/cases'
import SearchBar from '@components/searchBar'
import CaseList from '@components/caseList'
import BreadBar from '@components/breadBar'
import styles from './case.module.scss'

function Cases(props) {
  return (
    <BasicLayout headConfig={{ title: '装修案例' }}>
      <div className="conBox">
        {/* breadBar */}
        <BreadBar />

        {/* case */}
        <div className={styles.caseBox}>
          <SearchBar />
          <CaseList />
        </div>
      </div>
    </BasicLayout>
  )
}

export default props => (
  <CaseWrapper>
    <Cases {...props} />
  </CaseWrapper>
)
