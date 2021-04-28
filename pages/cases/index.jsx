import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import _ from 'lodash'
import { caseTags } from './tools/data'
import caseApi from '../../service/caseApi'
import styles from './case.module.scss'

import queryCaseOptionsForWeb from './tools/queryCaseOptionsForWeb.json'
import queryCaseListForWeb from './tools/queryCaseListForWeb.json'

const RenameItPlease = () => {
  const [searchTags, setsearchTags] = useState([])
  const [searchPara, setsearchPara] = useState({})
  const [caseList, setcaseList] = useState([])

  useEffect(() => {
    touchCaseTags()
  }, [])

  function touchCaseTags() {
    // const { data } = queryCaseOptionsForWeb
    // Object.keys(data).forEach(key => {
    //   const arr = data[key]
    //   arr?.unshift({ name: '全部', code: '' })
    //   arr?.push({ name: '其他', code: '99' })
    // })
    // setsearchPara(data)
    // setcaseList(queryCaseListForWeb.data.list)
    // return
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
      acreages: 0,
      bedRooms: 0,
      styles: '',
      pageNum: 1,
      pageSize: 10,
    }
    caseApi.queryCaseListForWeb({ ...param, ...config }).then(res => {
      console.log(res)
    })
  }

  function tagClick(key, code) {
    searchPara[key] = code
    touchCaseList(searchPara)
    setsearchPara(searchPara)
  }

  function pageChange(num, size) {
    console.log(num, size)
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
                      <span
                        className={`${searchPara?.[tagKey] === code ? styles.on : ''}`}
                        onClick={() => tagClick(tagKey, code)}
                        key={name}
                      >
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
            const {
              coverPicUrl,
              liveroom,
              bedroom,
              title,
              uid,
              acreage,
              styleDic = {},
              casePics = [],
            } = item
            return (
              <li key={uid}>
                <div className={styles.minImgBox}>
                  <img src={coverPicUrl} alt="" />
                </div>
                <div className="casePicBox">
                  <h3>{title}</h3>
                  <p>{` ${acreage}m² | ${bedroom ? bedroom : 1}室${liveroom ? liveroom : 1}厅 ${
                    styleDic?.name ? '| ' + styleDic?.name : ''
                  } `}</p>
                  <ul>
                    {casePics?.map(pic => {
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
      </div>
    </div>
  )
}

export default RenameItPlease
