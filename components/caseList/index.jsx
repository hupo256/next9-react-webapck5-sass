import React, { useEffect } from 'react'
import Router from 'next/router'
import tools from '@libs/utils'
import { Pagination } from 'antd'
import { useCaseContext } from '@store/cases'
import NoData from '@components/noData'
import styles from './caseList.module.scss'
import desStyles from './descase.module.scss'

const { urlParamHash, baseImgUrl } = tools
const caseLen = 3 // 众多图片中需要显示前几张

export default function CaseList(props) {
  const { liData } = props
  const { touchDataList, dataList } = useCaseContext()
  const theData = liData || dataList

  useEffect(() => {
    !liData && touchDataList()
  }, [])

  function pageChange(num, size) {
    console.log(num, size)
    const { uid = '' } = urlParamHash()
    const desPara = {
      casePageNum: num,
      casePageSize: size,
      uid,
    }
    const para = { pageNum: num, pageSize: size }
    const param = liData ? desPara : para
    touchDataList(param)
  }

  return (
    <>
      {theData?.list?.length > 0 ? (
        <ul className={`${styles.listBox} ${liData ? desStyles.desingCases : ''}`}>
          {theData.list.map(item => {
            const { coverPicUrl, liveroom, bedroom, title, uid, acreage, styleDic = {}, casePics = [] } = item
            const showPics = casePics?.slice(0, caseLen)
            return (
              <li key={uid} onClick={() => Router.push(`/cases/details?uid=${uid}`)}>
                <div className={styles.minImgBox}>
                  <img src={coverPicUrl || `${baseImgUrl}20210511/5e3f0cd9c02d4a6d94edbd66808e6d21/failImg.png`} />
                </div>
                <div className={styles.casePicBox}>
                  <h3>{title}</h3>
                  <p>
                    {acreage && <span>{`${acreage}m²`}</span>}
                    {(!!bedroom || !!liveroom) && <span>{`${bedroom}室${liveroom}厅`}</span>}
                    {styleDic?.name && <span>{styleDic.name}</span>}
                  </p>
                  <ul className={`${liData ? desStyles.picList : ''}`}>
                    {showPics?.map((pic, ind) => {
                      const { url, spaceDic = {} } = pic
                      return (
                        <li className={styles.minImgBox} key={ind}>
                          <img src={url || `${baseImgUrl}20210511/5e3f0cd9c02d4a6d94edbd66808e6d21/failImg.png`} />
                          {spaceDic?.name && <span>{spaceDic.name}</span>}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </li>
            )
          })}
        </ul>
      ) : (
        <NoData tips="案例" />
      )}

      <div className={styles.pageBox}>
        {(theData?.recordTotal || theData?.total) && (
          <Pagination
            hideOnSinglePage={true}
            onChange={pageChange}
            defaultCurrent={1}
            total={theData.recordTotal || theData.total}
          />
        )}
      </div>
    </>
  )
}
