import React, { useEffect, useState } from 'react'
import caseApi from '../../service/caseApi'
import { useAppContext } from '@store/index'
import styles from './searchBar.module.scss'

export const caseLabels = [
  {
    label: '户型',
    tagKey: 'bedRooms',
  },
  {
    label: '面积',
    tagKey: 'acreages',
  },
  {
    label: '风格',
    tagKey: 'styles',
  },
]

export const siteLabels = [
  {
    label: '户型',
    tagKey: 'bedRooms',
  },
  {
    label: '面积',
    tagKey: 'acreages',
  },
  {
    label: '造价',
    tagKey: 'renovationCosts',
  },
]

export default function Footer(props) {
  const { searchPara, setsearchPara, searchTags, touchSearchTags, touchCaseData } = useAppContext()

  useEffect(() => {
    touchSearchTags()
  }, [])

  function tagClick(key, code) {
    searchPara[key] = code
    touchCaseData({ [key]: code })
    setsearchPara(searchPara)
  }

  return (
    <ul className={styles.searchBox}>
      {caseLabels?.map(item => {
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
  )
}
