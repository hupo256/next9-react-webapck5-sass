import React, { useEffect, useState } from 'react'
import tools from '@libs/utils'
import { useAppContext } from '@store/index'
import { CaseWrapper } from '@store/cases'
import designerApi from '@service/designerApi'
import BreadBar from '@components/breadBar'
import CaseList from '@components/caseList'
import Footer from '@components/footer'
import desStyles from './designers.module.scss'

const { urlParamHash } = tools

function DesignDetail(props) {
  const { companyData } = useAppContext()
  const [details, setdetails] = useState({})
  const { headPicUrl, workingTime, name, position, designConcept, description, styles, caseList } = details

  useEffect(() => {
    touchDetails()
  }, [])

  function touchDetails() {
    const { uid = '' } = urlParamHash()
    const param = {
      casePageNum: 1,
      casePageSize: 10,
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
      <div className={desStyles.grayBg}>
        <div className={desStyles.conBox}>
          {/* breadBar */}
          <BreadBar curTit={name} />

          {/* detail */}
          <div className={desStyles.detailBox}>
            <div className={desStyles.desInfo} onClick={() => Router.push(`/designers/detail?uid=${uid}`)}>
              <div className={desStyles.headimg}>
                <div>
                  <img src={headPicUrl} alt="" />
                  <span>从业{workingTime}年</span>
                </div>
                <div>
                  <h3>
                    <b>{name}</b> <span>{position}</span>
                  </h3>
                  <p>{styles?.map(dic => dic.name).join(' / ') || '暂无'}</p>
                  <p>{designConcept}</p>
                </div>
              </div>
              <p>{description}</p>
            </div>

            {caseList?.list?.length > 0 && (
              <div className={desStyles.desCases}>
                <CaseList liData={caseList} />
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer {...companyData} />
    </>
  )
}

export default props => (
  <CaseWrapper>
    <DesignDetail {...props} />
  </CaseWrapper>
)
