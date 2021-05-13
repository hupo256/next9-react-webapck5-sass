import 'antd/dist/antd.css'
import '../styles/globals.css'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import homePageService from '@service/pcPreview' //admin特需

import { AppWrapper } from '@store/index'

function MyApp({ Component, pageProps }) {
  const [footerData, setFooterData] = useState({
    title: '',
    keywords: '',
    content: '',
    icon: '',
  })

  useEffect(() => {
    ;(async () => {
      const res = await homePageService.getFooter()
      setFooterData(_.get(res, 'data', {}))
    })()
  }, [])

  return (
    <>
      <Head>
        <title>{footerData.title || '首页'}</title>
        <meta name="keywords" content={footerData.keywords && JSON.parse(footerData.keywords).join(',')} />
        <meta name="description" content={footerData.content} />
        <link rel="icon" type="image/png" href={footerData.icon} />
      </Head>
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </>
  )
}

export default MyApp
