import React, { useEffect, useState } from 'react'
import BasicLayout from '@components/HomePageLayout'
import { Tooltip } from 'antd'
import tools from '@libs/utils'
import { CaseWrapper } from '@store/cases'
import designerApi from '@service/designerApi'
import BreadBar from '@components/breadBar'
import CaseList from '@components/caseList'
import TextTip from '@components/textTip'
import styles from './designers.module.scss'

const { urlParamHash } = tools

export default function DesignDetail(props) {
  const [details, setdetails] = useState({})
  const { headPicUrl, workingTime, name, position, designConcept, caseList, profile } = details

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
    <CaseWrapper>
      <BasicLayout headConfig={details}>
        <div className="grayBg">
          <div className="conBox">
            {/* breadBar */}
            <BreadBar curTit={name} />

            {/* detail */}
            <div className={styles.detailBox}>
              <div className={styles.desInfo}>
                <div className={styles.headimg}>
                  <div>
                    <img src={headPicUrl} alt="" />
                    <span>从业{workingTime}年</span>
                  </div>
                  <div>
                    <h3>
                      <TextTip content={name} />
                      <span>{position}</span>
                    </h3>
                    <TextTip content={details?.styles?.map(dic => dic.name).join(' / ') || '暂无'} />
                    <Tooltip title={designConcept}>
                      <p>{designConcept}</p>
                    </Tooltip>
                  </div>
                  {profile && <p>{profile}</p>}
                </div>

                {caseList?.list?.length > 0 && (
                  <div className={styles.desCases}>
                    <CaseList liData={caseList} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </BasicLayout>
    </CaseWrapper>
  )
}
