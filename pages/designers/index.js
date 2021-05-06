import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd'
import { caseLabels } from './tools/data'
import designerApi from '../../service/designerApi'
import SearchBar from '../../components/searchBar'
import Footer from '../../components/footer'
import styles from './designers.module.scss'

import view from './tools/view.json'

const caseLen = 3 // 众多图片中需要显示前几张

export default function Site(props) {
  const [dataList, setdataList] = useState([])
  const [recordTotal, setrecordTotal] = useState(0)

  useEffect(() => {
    touchList()
    touchDetails()
    // mockData()
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

  function touchList(config = {}) {
    const param = {
      // ...searchPara,
      pageNum: 1,
      pageSize: 10,
      // status: '1',
    }
    designerApi.queryDesignerListForWeb({ ...param, ...config }).then(res => {
      console.log(res)
      if (!res?.data) return
      const { data } = res
      // setcaseList(data?.list)
      // setrecordTotal(data?.recordTotal)
    })
  }

  function touchDetails() {
    designerApi.queryDesignerForWebByUid({ uid: '5bea59b572da40989cebd7908076a1d4' }).then(res => {
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
          <ul className={styles.listBox}></ul>

          <div className={styles.pageBox}>
            <Pagination hideOnSinglePage={true} onChange={pageChange} defaultCurrent={1} total={recordTotal} />
          </div>
        </div>
      </div>

      {/* {companyData && <Footer {...companyData} />} */}
    </>
  )
}
