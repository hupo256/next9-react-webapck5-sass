import React, { useEffect, useState } from 'react'
import BasicLayout from '@components/Home/HomePageLayout'
import tools from '@libs/utils'
import { useAppContext } from '@store/index'
import articleApi from '@service/articleApi'
import BreadBar from '@components/breadBar'
import styles from './articles.module.scss'

const { urlParamHash } = tools

export default function CaseDetail(props) {
  const { companyData } = useAppContext()
  const [details, setdetails] = useState({})
  const { articleTitle, articleCoverImg, creatorName, createTime, articleContent } = details

  useEffect(() => {
    touchDetail()
  }, [])

  function touchDetail() {
    const { articleUid = '4bce9f89f4734729afcd26d5c2022158' } = urlParamHash()
    articleApi.articleGet({ articleUid }).then(res => {
      console.log(res)
      if (!res?.data) return
      setdetails(res.data)
    })
  }

  return (
    <BasicLayout title={details?.articleTitle}>
      <div className={styles.conBox}>
        {/* breadBar */}
        <BreadBar curTit={details?.articleTitle} />

        {/* detail */}
        <div className={styles.detailBox}>
          <h3>{articleTitle}</h3>
          <p className={styles.subTit}>
            {creatorName && <span>作者：{creatorName}</span>}
            {createTime && <span>发布时间：{createTime}</span>}
          </p>
          <img src={articleCoverImg} alt="" />
          <div dangerouslySetInnerHTML={{ __html: articleContent }} />
        </div>
      </div>
    </BasicLayout>
  )
}
