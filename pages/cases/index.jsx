import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd'
import Link from 'next/link'
import _ from 'lodash'
import { caseTags } from './tools/data'
import { Services } from '../../libs/services'
import caseApi from '../../service/caseApi'
import styles from './case.module.scss'

import queryCaseOptionsForWeb from './tools/queryCaseOptionsForWeb.json'
import queryCaseListForWeb from './tools/queryCaseListForWeb.json'

const caseLen = 3 // 众多图片中需要显示前几张

const RenameItPlease = () => {
  const [searchTags, setsearchTags] = useState([])
  const [searchPara, setsearchPara] = useState({})
  const [caseList, setcaseList] = useState([])

  useEffect(() => {
    touchCaseTags()
  }, [])

  function touchCaseTags() {
    const { data } = queryCaseOptionsForWeb
    Object.keys(data).forEach(key => {
      const arr = data[key]
      arr?.unshift({ name: '全部', code: '' })
      arr?.push({ name: '其他', code: '99' })
    })
    setsearchTags(data)

    setcaseList(queryCaseListForWeb.data.list)
    return

    // testApi()
    caseApi.queryCaseOptionsForWeb().then(res => {
      console.log(res)
      if (!res?.data) return
      const { data } = res
      Object.keys(data).forEach(key => {
        const arr = data[key]
        arr?.unshift({ name: '全部', code: '' })
        arr?.push({ name: '其他', code: '99' })
      })
      console.log(data)
      setsearchTags(data)
      touchCaseList()
    })
  }

  function touchCaseList(config = {}) {
    const param = {
      // acreages: 0,
      // bedRooms: 0,
      // styles: '',
      ...searchPara,
      pageNum: 1,
      pageSize: 10,
    }
    caseApi.queryCaseListForWeb({ ...param, ...config }).then(res => {
      console.log(res)
      if (!res?.data) return
      setcaseList(res.data?.list)
    })
  }

  function touchDetails() {
    caseApi.getCaseByUidForWeb({ uid: '8027af336e8f449c9f91dfd2fbe5cdeb' }).then(res => {
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

  function testApi() {
    Services.findAllChannels().then(res => {
      console.log(res)
    })
    Services.findAllFooters().then(res => {
      console.log(res)
    })
  }

  return (
    <div className={styles.conBox}>
      {/* breadBar */}
      <div className={styles.breadBox}>
        当前位置: <a href="">首页</a> &gt; <a href="">看案例</a>
      </div>

      {/* case */}
      <div className={styles.caseBox}>
        <ul className={styles.searchBox}>
          {caseTags?.map(item => {
            const { label, tagKey } = item
            const tagArr = searchTags?.[tagKey]
            return (
              <li key={label}>
                <b>{label}</b>
                <div className={styles.tags}>
                  {tagArr?.map(tag => {
                    const { name, code } = tag
                    return (
                      <span className={`${searchPara?.[tagKey] === code ? styles.on : ''}`} onClick={() => tagClick(tagKey, code)} key={name}>
                        {name}
                      </span>
                    )
                  })}
                </div>
              </li>
            )
          })}
        </ul>

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
                  <p>{` ${acreage}m² | ${bedroom ? bedroom : 1}室${liveroom ? liveroom : 1}厅 ${styleDic?.name ? '| ' + styleDic?.name : ''} `}</p>
                  <ul>
                    {showPics?.map(pic => {
                      const { url, spaceDic = {} } = pic
                      return (
                        <li className={styles.minImgBox}>
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
          <Pagination onChange={pageChange} defaultCurrent={1} total={50} />
        </div>
      </div>
    </div>
  )
}

export default RenameItPlease
