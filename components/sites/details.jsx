import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import BasicLayout from '@components/HomePageLayout'
import tools from '@libs/utils'
import siteApi from '@service/siteApi'
import BreadBar from '@components/breadBar'
import SiteCell from './siteList/siteCell'
import DiaryList from './diaryList'
import styles from './site.module.scss'

const { urlParamHash } = tools

export default function CaseDetail(props) {
  const [details, setdetails] = useState({})
  const { gongdiTitle, gongdiStage, title, keywords, description } = details

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
    <>
      <Head>
        <title>{title || gongdiTitle}</title>
        {keywords && <meta name="keywords" content={JSON.parse(keywords).join(',')} />}
        {description && <meta name="description" content={description} />}
      </Head>
      <BasicLayout title={gongdiTitle}>
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
    </>
  )
}
