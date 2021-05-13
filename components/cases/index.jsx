import React, { useEffect } from 'react'
import Head from 'next/head'
import BasicLayout from '@components/HomePageLayout'
import { useAppContext } from '@store/index'
import { CaseWrapper } from '@store/cases'
import SearchBar from '@components/searchBar'
import CaseList from '@components/caseList'
import BreadBar from '@components/breadBar'
import styles from './case.module.scss'

function Cases(props) {
  const { companyData, touchCompanyInfor } = useAppContext()

  useEffect(() => {
    touchCompanyInfor()
  }, [])

  return (
    <>
      <Head>
        <title>{`看案例`}</title>
      </Head>
      <BasicLayout>
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
    </>
  )
}

export default props => (
  <CaseWrapper>
    <Cases {...props} />
  </CaseWrapper>
)
