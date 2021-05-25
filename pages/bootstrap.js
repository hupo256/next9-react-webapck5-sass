// import 'antd/dist/antd.css'
// import '../styles/globals.css'
import _ from 'lodash'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import homePageService from '@service/pcPreview' //admin特需
import axios from 'axios'

import { AppWrapper } from '@store/index'

export default function NextApp({ Component, pageProps }) {
  const [footerData, setFooterData] = useState({
    title: '',
    keywords: '',
    content: '',
    icon: '',
  })

  useEffect(() => {
    ;(async () => {
      const res = await homePageService.getFooter()
      const data = _.get(res, 'data', {})
      setFooterData(data)

      if (document && !_.isEmpty(data)) {
        const string = data.header,
          temp = document.createElement('div')

        temp.innerHTML = string
        const elemScripts = temp.querySelectorAll('script')

        _.forEach(elemScripts, async elem => {
          const src = elem.src
          if (src) {
            try {
              const res = await axios.get(src)
              eval(res.data)
            } catch (e) {}
          }
        })
      }
    })()
  }, [])

  if (_.isEmpty(footerData)) return null

  return (
    <>
      <Head>
        <title>{footerData.title || '首页'}</title>
        <meta name="keywords" content={footerData.keywords && JSON.parse(footerData.keywords).join(',')} />
        <meta name="description" content={footerData.description} />
        <link rel="icon" type="image/png" href={footerData.icon} />
      </Head>
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </>
  )
}
