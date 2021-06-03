import React, { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import { Pagination } from 'antd'
import tools from '@libs/utils'
import siteApi from '@service/siteApi'
import NoData from '@components/noData'
import styles from './diaryList.module.scss'

const Viewer = dynamic(import('react-viewer'), {
  ssr: false, //这个要加上,禁止使用 SSR
})

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

  function pageChange(num, size, gongdiDicUid, curInd) {
    const { gongdiUid = '' } = urlParamHash()
    console.log(num, size, gongdiDicUid)
    const param = {
      gongdiUid,
      gongdiDicUid,
      pageNum: num,
      pageSize: size,
    }
    siteApi.siteDiaryList(param).then(res => {
      console.log(res)
      if (!res?.data) return
      diarys[curInd].pageList.list = res.data?.list || []
      setdiarys(diarys.slice())
    })
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
            const { dicCode, dicName, dicUid, pageList = {} } = diary
            const { recordTotal, list } = pageList
            return (
              <div key={dicCode} className={styles.cellDiary}>
                <b className={`${ind === 0 ? styles.cur : ''}`}>{dicName}</b>
                <ul ref={imgView}>
                  {list?.map(stage => {
                    const { diaryUid, diaryDateFormat, diaryContent, fileList, viewShow = false, viewInd = 0 } = stage
                    return (
                      <li key={diaryUid}>
                        <p>{diaryDateFormat}</p>
                        <p>{diaryContent}</p>
                        {fileList?.map((file, imgInd) => {
                          const { fileUid, fileUrl } = file
                          return (
                            <div key={fileUid} className={styles.minImgBox}>
                              <img src={fileUrl} onClick={() => diaryImgClick(imgInd, stage)} />
                            </div>
                          )
                        })}
                        <Viewer
                          visible={viewShow}
                          onClose={() => viewMaskClick(stage)}
                          onMaskClick={() => viewMaskClick(stage)}
                          images={fileList?.map(file => ({ src: file.fileUrl, alt: file.fileUid }))}
                          activeIndex={viewInd}
                        />
                      </li>
                    )
                  })}
                </ul>
                {recordTotal > 10 && (
                  <div className={styles.pageBox}>
                    <Pagination
                      hideOnSinglePage={true}
                      defaultPageSize={5}
                      onChange={(num, size) => pageChange(num, size, dicUid, ind)}
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
