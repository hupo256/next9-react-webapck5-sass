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
    tagKey: 'bedroom',
  },
  {
    label: '面积',
    tagKey: 'buildingArea',
  },
  {
    label: '造价',
    tagKey: 'renovationCosts',
  },
]

export default function SearchBar(props) {
  const { from } = props
  const { searchPara, setsearchPara, searchTags, touchSearchTags, touchDataList } = useCaseContext()
  const isSite = from === 'sites'
  const labels = isSite ? siteLabels : caseLabels

  useEffect(() => {
    touchSearchTags(from)
  }, [])

  function tagClick(key, code) {
    const preCode = searchPara[key]
    searchPara[key] = code

    setsearchPara(searchPara)
    preCode !== code && touchDataList({ [key]: code, from })
  }

  return (
    <ul className={styles.searchBox}>
      {labels?.map(item => {
        const { label, tagKey } = item
        const tagArr = searchTags?.[tagKey]
        if (tagArr?.length === 0) return null
        return (
          <li key={label}>
            <b>{label}</b>
            <div className={styles.tags}>
              {tagArr?.map(tag => {
                const { name, code, value } = tag
                const val = isSite ? value : code
                return (
                  <span
                    className={`${searchPara?.[tagKey] === val ? styles.on : ''}`}
                    onClick={() => tagClick(tagKey, val)}
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
