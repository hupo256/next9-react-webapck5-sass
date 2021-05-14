import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import BasicLayout from '@components/HomePageLayout'
import tools from '@libs/utils'
import { CaseWrapper } from '@store/cases'
import designerApi from '@service/designerApi'
import BreadBar from '@components/breadBar'
import CaseList from '@components/caseList'
import styles from './designers.module.scss'

const { urlParamHash, createMeta } = tools

function DesignDetail(props) {
  const [details, setdetails] = useState({})
  const { headPicUrl, workingTime, name, position, designConcept, caseList, title, keywords, description } = details

  useEffect(() => {
    touchDetails()
  }, [])

  function touchDetails() {
    const { uid = '' } = urlParamHash()
    const param = {
      casePageNum: 1,
      casePageSize: 10,
      casePicPageNum: 1,
      casePicPageSize: 4,
      uid,
    }
    designerApi.queryDesignerForWebByUid(param).then(res => {
      console.log(res)
      // return
      if (!res?.data) return
      setdetails(res.data)
    })
  }

  return (
    <>
      <Head>
        <title>{title || name}</title>
        {keywords && createMeta(keywords)}
        {description && <meta name="description" content={description} />}
      </Head>
      <BasicLayout title={name}>
        <div className="grayBg">
          <div className="conBox">
            {/* breadBar */}
            <BreadBar curTit={name} />

            {/* detail */}
            <div className={styles.detailBox}>
              <div className={styles.desInfo} onClick={() => Router.push(`/designers/details?uid=${uid}`)}>
                <div className={styles.headimg}>
                  <div>
                    <img src={headPicUrl} alt="" />
                    <span>从业{workingTime}年</span>
                  </div>
                  <div>
                    <h3>
                      <b>{name}</b> <span>{position}</span>
                    </h3>
                    <p>{details?.styles?.map(dic => dic.name).join(' / ') || '暂无'}</p>
                    <p>{designConcept}</p>
                  </div>
                </div>
              </div>

              {caseList?.list?.length > 0 && (
                <div className={styles.desCases}>
                  <CaseList liData={caseList} />
                </div>
              )}
            </div>
          </div>
        </div>
      </BasicLayout>
    </>
  )
}

export default props => (
  <CaseWrapper>
    <DesignDetail {...props} />
  </CaseWrapper>
)
