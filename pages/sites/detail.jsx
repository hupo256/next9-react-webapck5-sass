import React, { useEffect, useState } from 'react'
import tools from '@libs/utils'
import { useAppContext } from '@store/index'
import siteApi from '@service/siteApi'
import BreadBar from '@components/breadBar'
import Footer from '@components/footer'
import SiteCell from './siteList/siteCell'
import DiaryList from './diaryList'
import styles from './site.module.scss'

const { urlParamHash } = tools

export default function CaseDetail(props) {
  const { companyData } = useAppContext()
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
    siteApi.sitePageTree({ gongdiUid }).then(res => {
      console.log(res)
      if (!res?.data) return
      // setdetails(res.data)
    })
  }

  function touchDiaryList() {
    const param = {
      gongdiStage: 'D210312000011',
      gongdiUid: 'ff8e72d565604c68a43686b2291473b6',
      pageNum: 1,
      pageSize: 10,
    }
    siteApi.siteDiaryList(param).then(res => {
      console.log(res)
    })
  }

  return (
    <>
      <div className={styles.grayBg}>
        <div className={styles.conBox}>
          {/* breadBar */}
          <BreadBar curTit={details?.gongdiTitle} />

          {/* detail */}
          <div className={styles.detailCard}>
            <SiteCell list={[details]} />
          </div>

          <DiaryList />
        </div>
      </div>

      <Footer {...companyData} />
    </>
  )
}
