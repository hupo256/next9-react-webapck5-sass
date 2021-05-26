import React from 'react'
import { Tooltip } from 'antd'
import styles from './textTip.module.scss'

export default function TextTip({ content }) {
  return (
    <Tooltip title={content}>
      <p className={styles.textTip}>{content}</p>
    </Tooltip>
  )
}
