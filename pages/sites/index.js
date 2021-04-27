import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import _ from 'lodash'

const getServerSideProps = async context => {
  const { data } = await axios.get('/api/getCommonList?object=case')
  return {
    props: { data },
  }
}

const RenameItPlease = () => {
  const [value, setValue] = useState({})

  useEffect(() => {
    ;(async () => {
      const {
        props: { data },
      } = await getServerSideProps()
      setValue(data)
    })()
  }, [])

  return (
    <>
      {_.map(value, (item, index) => (
        <p key={index}>
          <Link href={`/sites/${item.name}`}>
            <a>{item.name}</a>
          </Link>
        </p>
      ))}
    </>
  )
}

export default RenameItPlease
