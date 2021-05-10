import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd'
import tools from '../../../libs/utils'
import siteApi from '@service/siteApi'
import styles from './diaryList.module.scss'

const { urlParamHash } = tools

export default function CaseDetail(props) {
  const [diarys, setdiarys] = useState([])

  useEffect(() => {
    touchDiarys()
  }, [])

  function touchDiarys() {
    const { gongdiUid = '' } = urlParamHash()
    siteApi.sitePageTree({ gongdiUid }).then(res => {
      console.log(res)
      if (!res?.data) return
      setdiarys(res.data)
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

  function pageChange(num, size) {
    console.log(num, size)
    // touchDataList({ pageNum: num, pageSize: size })
  }

  return (
    <>
      {diarys?.length > 0 ? (
        <div className={styles.diaryBox}>
          {diarys.map((diary, ind) => {
            const { dicCode, dicName, pageList = {} } = diary
            const { recordTotal, list } = pageList
            return (
              <div key={dicCode} className={styles.cellDiary}>
                <b className={`${ind === 0 ? styles.cur : ''}`}>{dicName}</b>
                <ul>
                  {list?.map(page => {
                    const { diaryUid, diaryDate, diaryContent, fileList } = page
                    return (
                      <li key={diaryUid}>
                        <p>{diaryDate}</p>
                        <p>{diaryContent}</p>
                        {fileList?.map(file => {
                          const { fileUid, fileUrl } = file
                          return (
                            <div className={styles.minImgBox}>
                              <img key={fileUid} src={fileUrl} />
                            </div>
                          )
                        })}
                      </li>
                    )
                  })}
                </ul>
                <div className={styles.pageBox}>
                  <Pagination
                    hideOnSinglePage={true}
                    onChange={pageChange}
                    defaultCurrent={1}
                    total={recordTotal}
                    defaultCurrent={1}
                  />
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <span>暂无数据</span>
      )}
    </>
  )
}
