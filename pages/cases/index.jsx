import React, { useEffect } from 'react'
import BasicLayout from '@components/HomePageLayout'
import { CaseWrapper } from '@store/cases'
import SearchBar from '@components/searchBar'
import CaseList from '@components/caseList'
import BreadBar from '@components/breadBar'
import styles from './case.module.scss'

export default function Cases(props) {
  return (
    <CaseWrapper>
      <BasicLayout headConfig={{ title: '装修案例' }} pushType="case">
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
    </CaseWrapper>
  )
}
