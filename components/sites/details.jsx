import React, { useEffect, useState } from 'react'
import BasicLayout from '@components/PcPreview/HomePageLayout'
import tools from '@libs/utils'
import siteApi from '@service/siteApi'
import BreadBar from '@components/breadBar'
import SiteCell from './siteList/siteCell'
import DiaryList from './diaryList'
import styles from './site.module.scss'

const { urlParamHash } = tools

export default function CaseDetail(props) {
  const [details, setdetails] = useState({})

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
    <BasicLayout title={details?.gongdiTitle}>
      <div className="grayBg">
        <div className="conBox">
          {/* breadBar */}
          <BreadBar curTit={details?.gongdiTitle} />

          {/* detail */}
          <div className={styles.detailCard}>{details?.gongdiStage && <SiteCell list={[details]} />}</div>

          <DiaryList />
        </div>
      </div>
    </BasicLayout>
  )
}
