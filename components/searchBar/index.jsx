import React, { useEffect, useState } from 'react'
import { useCaseContext } from '@store/cases'
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
  const { searchPara, setsearchPara, searchTags, touchSearchTags, touchCaseData } = useCaseContext()

  useEffect(() => {
    touchSearchTags()
  }, [])

  function tagClick(e, key, code) {
    let curCode = ''
    const preCode = searchPara[key]
    if (preCode === code) {
      curCode = ''
      delete searchPara[key]
    } else {
      curCode = code
      searchPara[key] = code
    }

    setsearchPara(searchPara)
    touchCaseData({ [key]: curCode })
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
                    onClick={e => tagClick(e, tagKey, code)}
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
