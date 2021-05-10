import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd'
import Router from 'next/router'
import tools from '@libs/utils'
import { useAppContext } from '@store/index'
import articleApi from '@service/articleApi'
import BreadBar from '@components/breadBar'
import Footer from '@components/footer'
import styles from './articles.module.scss'

const { urlParamHash } = tools

export default function Site(props) {
  const { companyData, touchCompanyInfor } = useAppContext()
  const [curCode, setcurCode] = useState('D210317000004')
  const [tabs, settabs] = useState([])
  const [artsData, setartsData] = useState(null)

  useEffect(() => {
    touchCompanyInfor()
    touchArticleDic()
  }, [])

  function touchArticleDic() {
    articleApi.queryArticleDic().then(res => {
      console.log(res)
      if (!res?.data) return
      const { data } = res
      const { code } = data[0]
      settabs(data)
      setcurCode(code)
      touchList({ articleDicCode: code })
    })
  }

  function touchList(config = {}) {
    const param = {
      articleDicCode: '',
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

  function codeChange(code) {
    console.log(code)
    setcurCode(code)
    touchList({ articleDicCode: code })
  }

  return (
    <>
      <div className={styles.conBox}>
        {/* breadBar */}
        <BreadBar />

        {/* articles */}
        <div className={styles.articleBox}>
          <ul className={styles.tabBox}>
            {tabs?.map(tab => {
              const { code, name } = tab
              return (
                <li key={code} className={`${curCode === code ? styles.on : ''}`} onClick={() => codeChange(code)}>
                  <span>{name}</span>
                </li>
              )
            })}
          </ul>

          <ul className={styles.listBox}>
            {artsData?.list?.map(art => {
              const { articleCoverImg, articleDescription, articleTitle, createTime, articleUid } = art
              return (
                <li key={articleUid} onClick={() => Router.push(`/articles/detail?articleUid=${articleUid}`)}>
                  <div className={styles.minImgBox}>
                    <img src={articleCoverImg} alt="" />
                  </div>

                  <div className={styles.casePicBox}>
                    <h3>{articleTitle}</h3>
                    <p>{articleDescription}</p>
                    <p>{createTime}</p>
                  </div>
                </li>
              )
            })}
          </ul>

          <div className={styles.pageBox}>
            <Pagination
              hideOnSinglePage={true}
              onChange={pageChange}
              defaultCurrent={1}
              total={artsData?.recordTotal}
              defaultCurrent={1}
            />
          </div>
        </div>
      </div>
      <Footer {...companyData} />
    </>
  )
}
