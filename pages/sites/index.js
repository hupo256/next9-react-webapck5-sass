import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd'
import { siteLabels } from './tools/data'
import siteApi from '../../service/siteApi'
import SearchBar from '../../components/searchBar'
import Footer from '../../components/footer'
import styles from './site.module.scss'

import view from './tools/view.json'

const caseLen = 3 // 众多图片中需要显示前几张

export default function Site(props) {
  const [searchTags, setsearchTags] = useState([])
  const [searchPara, setsearchPara] = useState({})
  const [caseList, setcaseList] = useState([])
  const [recordTotal, setrecordTotal] = useState(0)
  const [companyData, setcompanyData] = useState(null)

  useEffect(() => {
    touchTags()
    touchList()
  }, [])

  function mockData() {
    const { data } = queryCaseOptionsForWeb
    Object.keys(data).forEach(key => {
      const arr = data[key]
      arr?.unshift({ name: '全部', code: '' })
      arr?.push({ name: '其他', code: '99' })
    })
    setsearchTags(data)

    setcaseList(queryCaseListForWeb.data.list)
  }
  function touchTags() {
    siteApi.siteParams().then(res => {
      console.log(res)
      return
      if (!res?.data) return
      const { data } = res
      Object.keys(data).forEach(key => {
        const arr = data[key]
        arr?.unshift({ name: '全部', code: '' })
        arr?.push({ name: '其他', code: '99' })
      })
      console.log(data)
      setsearchTags(data)
      touchList()
    })
  }

  function touchList(config = {}) {
    const param = {
      ...searchPara,
      bedroom: '',
      buildingArea: '',
      renovationCosts: '',
      pageNum: 1,
      pageSize: 10,
    }
    siteApi.sitePageList({ ...param, ...config }).then(res => {
      console.log(res)
      if (!res?.data) return
      const { data } = res
      setcaseList(data?.list)
      setrecordTotal(data?.recordTotal)
    })
  }

  function touchDetails() {
    siteApi.getCaseByUidForWeb({ uid: '8027af336e8f449c9f91dfd2fbe5cdeb' }).then(res => {
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
          当前位置: <a href="">首页</a> &gt; <a href="">看案例</a>
        </div>

        {/* case */}
        <div className={styles.caseBox}>
          <SearchBar labels={siteLabels} searchTags={searchTags} searchPara={searchPara} />

          <ul className={styles.listBox}>
            {caseList?.map(item => {
              const { coverPicUrl, liveroom, bedroom, title, uid, acreage, styleDic = {}, casePics = [] } = item
              const showPics = casePics?.slice(0, caseLen)
              return (
                <li key={uid}>
                  <div className={styles.minImgBox}>
                    <img src={coverPicUrl} alt="" />
                  </div>
                  <div className={styles.casePicBox}>
                    <h3>{title}</h3>
                    <p>{` ${acreage}m² | ${bedroom ? bedroom : 1}室${liveroom ? liveroom : 1}厅 ${
                      styleDic?.name ? '| ' + styleDic?.name : ''
                    } `}</p>
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

          <div className={styles.pageBox}>
            <Pagination hideOnSinglePage={true} onChange={pageChange} defaultCurrent={1} total={recordTotal} />
          </div>
        </div>
      </div>

      {companyData && <Footer {...companyData} />}
    </>
  )
}
