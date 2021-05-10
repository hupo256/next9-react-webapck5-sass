import React, { useEffect } from 'react'
import Router from 'next/router'
import { Pagination } from 'antd'
import { useCaseContext } from '@store/cases'
import SiteCell from './siteCell'
import styles from './siteList.module.scss'

export default function CaseList(props) {
  const { from } = props
  const { touchDataList, dataList } = useCaseContext()
  useEffect(() => {
    touchDataList({ from })
  }, [])

  function pageChange(num, size) {
    console.log(num, size)
    touchDataList({ pageNum: num, pageSize: size, from })
  }

  return (
    <>
      {dataList?.list?.length > 0 ? <SiteCell list={dataList.list} /> : <div className={styles.listBox}>暂无数据</div>}

      <div className={styles.pageBox}>
        <Pagination
          hideOnSinglePage={true}
          onChange={pageChange}
          defaultCurrent={1}
          total={dataList?.recordTotal}
          defaultCurrent={1}
        />
      </div>
    </>
  )
}
