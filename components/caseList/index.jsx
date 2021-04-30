import React, { useEffect } from 'react'
import { Pagination } from 'antd'
import { useAppContext } from '../../store'
import styles from './conListBar.module.scss'

const caseLen = 3 // 众多图片中需要显示前几张

export default function Footer(props) {
  const { touchCaseData, caseData } = useAppContext()

  useEffect(() => {
    touchCaseData()
  }, [])

  function pageChange(num, size) {
    console.log(num, size)
    touchCaseData({ pageNum: num, pageSize: size })
  }

  return (
    <>
      {caseData?.list?.length > 0 ? (
        <ul className={styles.listBox}>
          {caseData?.list?.map(item => {
            const { coverPicUrl, liveroom, bedroom, title, uid, acreage, styleDic = {}, casePics = [] } = item
            const showPics = casePics?.slice(0, caseLen)
            return (
              <li key={uid}>
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
          total={caseData?.recordTotal}
          defaultCurrent={1}
        />
      </div>
    </>
  )
}
