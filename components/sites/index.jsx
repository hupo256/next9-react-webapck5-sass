import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import BasicLayout from '@components/HomePageLayout'
import { CaseWrapper } from '@store/cases'
import SearchBar from '@components/searchBar'
import BreadBar from '@components/breadBar'
import SiteList from './siteList'
import styles from './site.module.scss'

function Sites(props) {
  return (
    <>
      <Head>
        <title>{`工地直播`}</title>
      </Head>
      <BasicLayout title="工地直播">
        <div className="conBox">
          {/* breadBar */}
          <BreadBar />

          {/* sites */}
          <div className={styles.siteBox}>
            <SearchBar from="sites" />
            <SiteList from="sites" />
          </div>
        </div>
      </BasicLayout>
    </>
  )
}

export default props => (
  <CaseWrapper>
    <Sites {...props} />
  </CaseWrapper>
)
