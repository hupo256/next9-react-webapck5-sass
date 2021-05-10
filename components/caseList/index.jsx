import React, { useEffect } from 'react'
import Router from 'next/router'
import tools from '@libs/utils'
import { Pagination } from 'antd'
import { useCaseContext } from '@store/cases'
import styles from './caseList.module.scss'

const { urlParamHash } = tools
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
        <ul className={styles.listBox}>
          {theData.list.map(item => {
            const { coverPicUrl, liveroom, bedroom, title, uid, acreage, styleDic = {}, casePics = [] } = item
            const showPics = casePics?.slice(0, caseLen)
            return (
              <li key={uid} onClick={() => Router.push(`/cases/detail?uid=${uid}`)}>
                <div className={styles.minImgBox}>
                  <img src={coverPicUrl} alt="" />
                </div>
                <div className={styles.casePicBox}>
                  <h3>{title}</h3>
                  <p>
                    {acreage && <span>{`${acreage}m²`}</span>}
                    {(!!bedroom || !!liveroom) && <span>{`${bedroom}室${liveroom}厅`}</span>}
                    {styleDic?.name && <span>{styleDic.name}</span>}
                  </p>
                  <ul>
                    {showPics?.map((pic, ind) => {
                      const { url, spaceDic = {} } = pic
                      return (
                        <li className={styles.minImgBox} key={ind}>
                          <img src={url} alt="" />
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
        <div className={styles.listBox}>暂无数据</div>
      )}

      <div className={styles.pageBox}>
        <Pagination
          hideOnSinglePage={true}
          onChange={pageChange}
          defaultCurrent={1}
          total={theData?.recordTotal || theData?.total}
          defaultCurrent={1}
        />
      </div>
    </>
  )
}
