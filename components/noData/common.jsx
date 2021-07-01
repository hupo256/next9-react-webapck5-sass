import React from 'react'
import styles from './noData.module.scss'

export default function NoData(props) {
  return (
    <div className={styles.noDataBox}>
      <img src="http://img.inbase.in-deco.com/crm-saas/img/home-preview/ic_nodate.png" alt="" />
      <p>未查询到数据</p>
    </div>
  )
}
