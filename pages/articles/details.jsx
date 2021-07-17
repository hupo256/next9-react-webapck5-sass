import React, { useEffect, useState } from 'react'
import BasicLayout from '@components/HomePageLayout'
import tools from '@libs/utils'
import articleApi from '@service/articleApi'
import BreadBar from '@components/breadBar'
import styles from './articles.module.scss'
import { useAppContext } from '../../store'

import dynamic from 'next/dynamic'
// import ShowTex from 'sample/showTex'
const ShowTex = dynamic(import('sample/showTex'), { ssr: false })
const VueHead = dynamic(import('sample/vueHead'), { ssr: false })

const { urlParamHash } = tools

export default function CaseDetail(props) {
  const [details, setdetails] = useState({})
  const { articleTitle, articleCoverImg, creatorName, createTime, articleContent } = details
  const { menuFetched } = useAppContext()
  useEffect(() => {
    if (!menuFetched) return
    touchDetail()
  }, [menuFetched])

  function touchDetail() {
    const { articleUid = '4bce9f89f4734729afcd26d5c2022158' } = urlParamHash()
    articleApi.articleGet({ articleUid }).then(res => {
      console.log(res)
      if (!res?.data) return
      setdetails(res.data)
    })
  }

  return (
    <BasicLayout headConfig={details} pushType="article">
      <div className="conBox">
        {/* breadBar */}
        <BreadBar curTit={details?.articleTitle} />

        <ShowTex />
        <VueHead name=" TEST" />

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
