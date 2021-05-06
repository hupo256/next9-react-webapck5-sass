import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import caseApi from '@service/caseApi'
import styles from './case.module.scss'

import queryCaseListForWeb from './tools/getCaseByUidForWeb.json'

export default function CaseDetail(props) {
  const { query } = useRouter()
  const [details, setdetails] = useState({})
  const {
    buildingName,
    liveroom,
    bedroom,
    acreage,
    styleDicName,
    decorationCost,
    designerName,
    casePics = [],
    styleDics = [],
    workingTime,
  } = details

  useEffect(() => {
    touchDetails()
  }, [])

  function touchDetails() {
    console.log(queryCaseListForWeb.data)
    setdetails(queryCaseListForWeb.data)
    return

    caseApi.getCaseByUidForWeb({ uid: query?.slug }).then(res => {
      console.log(res)
      if (!res?.data) return
      console.log(res.data)
      return
      setdetails(res.data)
    })
  }

  return (
    <div className={styles.grayBg}>
      <div className={styles.conBox}>
        {/* breadBar */}
        <div className={styles.breadBox}>
          当前位置: <a href="">首页</a> &gt; <a href="">看案例</a>
        </div>

        {/* detail */}
        <div className={styles.detailOut}>
          <div className={styles.detailBox}>
            <div className={styles.detSub}>
              <h3>案例信息</h3>
              <ul>
                <li>
                  <span>楼盘名称：</span>
                  <b>{buildingName}</b>
                </li>
                <li>
                  <span>案例户型：</span>
                  <b>{`${bedroom}室${liveroom}厅`}</b>
                </li>
                <li>
                  <span>案例面积：</span>
                  <b>{`${acreage}m²`}</b>
                </li>
                <li>
                  <span>案例风格：</span>
                  <b>{styleDicName}</b>
                </li>
                <li>
                  <span>装修造价：</span>
                  <b>{decorationCost}</b>
                </li>
                <li>
                  <span>设计师：</span>
                  <b>{designerName}</b>
                </li>
              </ul>
            </div>

            <div className={styles.detDec}>
              {casePics?.map(pic => {
                const { url, picDesc = '', spaceDic = {} } = pic
                return (
                  <>
                    <b>{spaceDic?.name}</b>
                    <img src={url} alt="" />
                    <p>{picDesc}</p>
                  </>
                )
              })}
            </div>
          </div>

          <div className={styles.designTag}>
            <div className={styles.nameBox}>
              <img src="" alt="" />
              <div className={styles.tit}>
                <h4>{designerName}</h4>
                <span>首席设计师</span>
              </div>
            </div>
            <p>
              <span>从业年限：</span>
              <b>
                <u>{workingTime}</u>年
              </b>
            </p>
            <p>
              <span>擅长风格：</span>
              {styleDics?.map(dic => dic.name).join('/')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
