import React, { useEffect, useState } from 'react'
import BasicLayout from '@components/HomePageLayout'
import { CaseWrapper } from '@store/cases'
import SearchBar from '@components/searchBar'
import BreadBar from '@components/breadBar'
import SiteList from '@components/siteComponents/siteList'
import styles from './site.module.scss'

export default function Sites(props) {
  return (
    <CaseWrapper>
      <BasicLayout headConfig={{ title: '参观工地' }} pushType="site">
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
    </CaseWrapper>
  )
}
