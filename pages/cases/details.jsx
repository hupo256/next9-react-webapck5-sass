import React, { useEffect, useState } from 'react'
import BasicLayout from '@components/HomePageLayout'
import tools from '@libs/utils'
import caseApi from '@service/caseApi'
import BreadBar from '@components/breadBar'
import RoomType from '@components/roomType'
import TextTip from '@components/textTip'
import styles from './case.module.scss'

const { urlParamHash } = tools

export default function CaseDetail(props) {
  const [details, setdetails] = useState({})
  const {
    buildingName,
    acreage,
    styleDicName,
    decorationCost,
    designerName,
    position,
    casePicGroups,
    styleDics,
    headPicUrl,
    workingTime,
    bedroom,
  } = details

  useEffect(() => {
    touchDetails()
  }, [])

  function touchDetails() {
    const { uid = '' } = urlParamHash()
    caseApi.getCaseByUidForWeb({ uid }).then(res => {
      if (!res?.data) return
      setdetails(res.data)
    })
  }

  return (
    <BasicLayout headConfig={details}>
      <div className="grayBg">
        <div className="conBox">
          {/* breadBar */}
          <BreadBar curTit={buildingName} />

          {/* detail */}
          <div className={styles.detailOut}>
            <div className={styles.detailBox}>
              <div className={styles.detSub}>
                <h3>案例信息</h3>
                <ul>
                  <li>
                    <span>楼盘名称：</span>
                    <p>{buildingName || '暂无'}</p>
                  </li>
                  <li>
                    <span>案例户型：</span>
                    <p>{!!bedroom ? <RoomType {...details} detailsTag={true} /> : '暂无'}</p>
                  </li>
                  <li>
                    <span>案例面积：</span>
                    <p>{acreage ? `${acreage}m²` : '暂无'}</p>
                  </li>
                  <li>
                    <span>案例风格：</span>
                    <p>{styleDicName || '暂无'}</p>
                  </li>
                  <li>
                    <span>装修造价：</span>
                    <p>{`${decorationCost ? decorationCost + '万' : '暂无'}`}</p>
                  </li>
                  <li>
                    <span>设计师：</span>
                    <p>{designerName || '暂无'}</p>
                  </li>
                </ul>
              </div>

              <div className={styles.detDec}>
                {casePicGroups?.map(cPic => {
                  const { spaceName = '其它', spaceDicCode, casePics } = cPic
                  return (
                    <div key={spaceDicCode}>
                      <b>{spaceName}</b>
                      {casePics?.map((pic, ind) => {
                        const { url, picDesc = '' } = pic
                        return (
                          <div key={ind}>
                            <img src={url} alt="" />
                            <p>{picDesc}</p>
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className={styles.designTag}>
              <div className={styles.nameBox}>
                <img src={headPicUrl} alt="" />
                <div className={styles.tit}>
                  <h4>{designerName}</h4>
                  {position && <span>{position}</span>}
                </div>
              </div>
              {workingTime && (
                <p>
                  <span>从业年限：</span>
                  <b>
                    <u>{workingTime}</u>年
                  </b>
                </p>
              )}
              <p>
                <span>擅长风格：</span>
                {styleDics?.map(dic => dic.name).join('/') || '暂无'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </BasicLayout>
  )
}
