import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd'
import articleApi from '../../service/articleApi'
import Footer from '../../components/footer'
import styles from './articles.module.scss'

import view from './tools/view.json'

export default function Site(props) {
  const [searchTags, setsearchTags] = useState([])
  const [searchPara, setsearchPara] = useState({})
  const [caseList, setcaseList] = useState([])
  const [recordTotal, setrecordTotal] = useState(0)
  const [companyData, setcompanyData] = useState(null)

  useEffect(() => {
    touchList()
  }, [])

  function touchList(config = {}) {
    const param = {
      ...searchPara,
      articleDicCode: '',
      articleStatus: 0,
      searchText: '',
      pageNum: 1,
      pageSize: 10,
    }
    articleApi.articlePageList({ ...param, ...config }).then(res => {
      console.log(res)
      if (!res?.data) return
      const { data } = res
      setcaseList(data?.list)
      setrecordTotal(data?.recordTotal)
    })
  }

  function touchDetails() {
    articleApi.articleGet({ uid: '8027af336e8f449c9f91dfd2fbe5cdeb' }).then(res => {
      console.log(res)
    })
  }

  function tagClick(key, code) {
    searchPara[key] = code
    touchCaseList({ [key]: code })
    setsearchPara(searchPara)
  }

  function pageChange(num, size) {
    console.log(num, size)
    touchCaseList({ pageNum: num, pageSize: size })
  }

  return (
    <>
      <div className={styles.conBox}>
        {/* breadBar */}
        <div className={styles.breadBox}>
          当前位置: <a href="">首页</a> &gt; <a href="">装修攻略</a>
        </div>

        {/* case */}
        <div className={styles.caseBox}>
          <div className={styles.pageBox}>
            <Pagination hideOnSinglePage={true} onChange={pageChange} defaultCurrent={1} total={recordTotal} />
          </div>
        </div>
      </div>

      {companyData && <Footer {...companyData} />}
    </>
  )
}
