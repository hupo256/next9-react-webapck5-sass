import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import _ from 'lodash'
import { sampleList } from '../../libs/utils'

const RenameItPlease = () => {
  const [value, setValue] = useState({})

  useEffect(() => {
    // 假代码，async 在这里call
    setValue(sampleList('cases'))
  }, [])

  return (
    <>
      {_.map(value, (item, index) => (
        <p key={index}>
          <Link href={`/cases/${item.name}`}>
            <a>{item.name}</a>
          </Link>
        </p>
      ))}
    </>
  )
}

export default RenameItPlease
