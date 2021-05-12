import React, { useEffect, useState, useRef } from 'react'
import { Pagination } from 'antd'
import tools from '@libs/utils'
import siteApi from '@service/siteApi'
import NoData from '@components/noData'
// import Viewer from 'react-viewer'
import styles from './diaryList.module.scss'

const { urlParamHash } = tools

export default function DiaryList(props) {
  const [diarys, setdiarys] = useState([])
  const imgView = useRef()

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
    const { gongdiUid = '' } = urlParamHash()
    const param = {
      gongdiUid,
      pageNum: 1,
      pageSize: 10,
    }
    siteApi.siteDiaryList(param).then(res => {
      console.log(res)
    })
  }

  function pageChange(num, size, gdStage) {
    console.log(num, size)
    touchDiaryList({ pageNum: num, pageSize: size, gongdiStage: gdStage })
  }

  function diaryImgClick(imgInd, item) {
    item.viewShow = true
    item.viewInd = imgInd
    setdiarys(diarys.slice())
  }

  function viewMaskClick(item) {
    item.viewShow = false
    setdiarys(diarys.slice())
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
                <ul ref={imgView}>
                  {list?.map(stage => {
                    const { diaryUid, diaryDate, diaryContent, fileList, viewShow = false, viewInd = 0 } = stage
                    return (
                      <li key={diaryUid}>
                        <p>{diaryDate}</p>
                        <p>{diaryContent}</p>
                        {fileList?.map((file, imgInd) => {
                          const { fileUid, fileUrl } = file
                          return (
                            <div key={fileUid} className={styles.minImgBox}>
                              <img src={fileUrl} onClick={() => diaryImgClick(imgInd, stage)} />
                            </div>
                          )
                        })}
                        {/* {!!window?.document && (
                          <Viewer
                            visible={viewShow}
                            onClose={() => viewMaskClick(stage)}
                            onMaskClick={() => viewMaskClick(stage)}
                            images={fileList?.map(file => ({ src: file.fileUrl, alt: file.fileUid }))}
                            activeIndex={viewInd}
                          />
                        )} */}
                      </li>
                    )
                  })}
                </ul>
                {recordTotal > 10 && (
                  <div className={styles.pageBox}>
                    <Pagination
                      hideOnSinglePage={true}
                      onChange={(num, size) => pageChange(num, size, list?.gongdiStage)}
                      defaultCurrent={1}
                      total={recordTotal}
                      size="small"
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <NoData tips="进度" />
      )}
    </>
  )
}
