import React, { useEffect, useState } from 'react'
import BasicLayout from '@components/HomePageLayout'
import tools from '@libs/utils'
import siteApi from '@service/siteApi'
import BreadBar from '@components/breadBar'
import SiteCell from './siteList/siteCell'
import DiaryList from './diaryList'
import styles from './site.module.scss'

const { urlParamHash } = tools

export default function SiteDetail(props) {
  const [details, setdetails] = useState({})
  const { gongdiTitle, gongdiStage } = details

  useEffect(() => {
    touchDetails()
  }, [])

  function touchDetails() {
    const { gongdiUid = '' } = urlParamHash()
    siteApi.siteDetails({ gongdiUid }).then(res => {
      console.log(res)
      if (!res?.data) return
      setdetails(res.data)
    })
  }

  return (
    <BasicLayout headConfig={details}>
      <div className="grayBg">
        <div className="conBox">
          {/* breadBar */}
          <BreadBar curTit={gongdiTitle} />

          {/* detail */}
          <div className={styles.detailCard}>{gongdiStage && <SiteCell list={[details]} />}</div>

          <DiaryList />
        </div>
      </div>
    </BasicLayout>
  )
}
