import React, { useEffect } from 'react'
import { useAppContext } from '@store/index'
import { CaseWrapper } from '@store/cases'
import SearchBar from '@components/searchBar'
import CaseList from '@components/caseList'
import BreadBar from '@components/breadBar'
import Footer from '@components/footer'
import styles from './case.module.scss'

function Cases(props) {
  const { companyData, touchCompanyInfor } = useAppContext()

  useEffect(() => {
    touchCompanyInfor()
  }, [])

  return (
    <>
      <div className={styles.conBox}>
        {/* breadBar */}
        <BreadBar />

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

export default props => (
  <CaseWrapper>
    <Cases {...props} />
  </CaseWrapper>
)
