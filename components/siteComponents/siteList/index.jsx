import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd'
import { useCaseContext } from '@store/cases'
import NoData from '@components/noData'
import SiteCell from './siteCell'
import styles from './siteList.module.scss'

const recordTotal = 35

export default function SiteList(props) {
  const { from } = props
  const { touchDataList, dataList, curPage } = useCaseContext()
  useEffect(() => {
    touchDataList({ from })
  }, [])

  function pageChange(num, size) {
    console.log(num, size)
    touchDataList({ pageNum: num, pageSize: size, from })
  }

  return (
    <>
      {dataList?.list?.length > 0 ? <SiteCell list={dataList.list} /> : <NoData tips="工地" />}

      <div className={styles.pageBox}>
        <Pagination
          current={curPage}
          hideOnSinglePage={true}
          onChange={pageChange}
          defaultCurrent={1}
          total={dataList?.recordTotal}
        />
      </div>
    </>
  )
}
