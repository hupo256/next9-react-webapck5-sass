import React, { useEffect, useState } from 'react'
import BasicLayout from '@components/HomePageLayout'
import { Pagination } from 'antd'
import tools from '@libs/utils'
import Router from 'next/router'
import articleApi from '@service/articleApi'
import BreadBar from '@components/breadBar'
import NoData from '@components/noData'
import styles from './articles.module.scss'
import { useAppContext } from '@store/index'

const { urlParamHash, baseImgUrl } = tools

export default function Site(props) {
  const [curId, setcurId] = useState('')
  const [tabs, settabs] = useState([])
  const [artsData, setartsData] = useState(null)
  const { menuFetched } = useAppContext()

  useEffect(() => {
    if (!menuFetched) return
    touchArticleDic()
  }, [menuFetched])

  function touchArticleDic() {
    articleApi.queryArticleDic().then(res => {
      console.log(res)
      if (!res?.data) return
      const { data } = res
      const { uid } = data[0]
      const theUid = urlParamHash().uid || uid
      settabs(data)
      setcurId(theUid)
      touchList({ articleDicUid: theUid })
    })
  }

  function touchList(config = {}) {
    const param = {
      articleDicUid: curId,
      articleStatus: 1,
      pageNum: 1,
      pageSize: 10,
    }
    articleApi.articlePageList({ ...param, ...config }).then(res => {
      console.log(res)
      if (!res?.data) return
      setartsData(res.data)
    })
  }

  function pageChange(num, size) {
    console.log(num, size)
    touchList({ pageNum: num, pageSize: size })
  }

  function codeChange(id) {
    console.log(id)
    setcurId(id)
    touchList({ articleDicUid: id })
  }

  return (
    <BasicLayout headConfig={{ title: '装修攻略' }} pushType="article">
      <div className={styles.conBox}>
        {/* breadBar */}
        <BreadBar />

        {/* articles */}
        <div className={styles.articleBox}>
          <ul className={styles.tabBox}>
            {tabs?.map(tab => {
              const { uid, name } = tab
              return (
                <li key={uid} className={`${curId === uid ? styles.on : ''}`} onClick={() => codeChange(uid)}>
                  <span>
                    <b>{name}</b>
                  </span>
                  {/* <span>{name}</span> */}
                </li>
              )
            })}
          </ul>

          {artsData?.list?.length > 0 ? (
            <ul className={styles.listBox}>
              {artsData.list.map(art => {
                const { articleCoverImg, articleShortContent, articleTitle, createTime, articleUid } = art
                return (
                  <li key={articleUid} onClick={() => Router.push(`/articles/details?articleUid=${articleUid}`)}>
                    <div className={styles.minImgBox}>
                      <img
                        src={articleCoverImg || `${baseImgUrl}20210511/5e3f0cd9c02d4a6d94edbd66808e6d21/failImg.png`}
                      />
                    </div>

                    <div className={styles.casePicBox}>
                      <h3>{articleTitle}</h3>
                      <p>{articleShortContent}</p>
                      <p>{createTime}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          ) : (
            <NoData tips="文章" />
          )}

          <div className={styles.pageBox}>
            {!!artsData?.recordTotal && (
              <Pagination
                hideOnSinglePage={true}
                onChange={pageChange}
                defaultCurrent={1}
                total={artsData.recordTotal}
              />
            )}
          </div>
        </div>
      </div>
    </BasicLayout>
  )
}
