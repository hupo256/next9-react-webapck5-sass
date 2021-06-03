import React from 'react'
import Head from 'next/head'

export default function Header(props) {
  const { title, keywords, description } = props
  const con = keywords && typeof keywords === 'string' ? JSON.parse(keywords) : keywords

  return (
    <Head>
      <title>{title || ''}</title>
      {keywords && <meta name="keywords" content={con.join(',')} />}
      {description && <meta name="description" content={description} />}
    </Head>
  )
}
