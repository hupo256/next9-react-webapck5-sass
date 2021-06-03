import 'antd/dist/antd.css'
import '../styles/globals.css'
import _ from 'lodash'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import homePageService from '@service/pcPreview' //admin特需
import axios from 'axios'
import ExpiredPage from '@components/500/500.jsx'

const { getFooter } = homePageService

import { AppWrapper } from '@store/index'

const EXPIRED_MAP = {
  loading: 'loading',
  expired: 'expired',
  notExpired: 'notExpired',
}

function MyApp({ Component, pageProps }) {
  const [footerData, setFooterData] = useState({
    title: '',
    keywords: '',
    content: '',
    icon: '',
  })

  const [expired, setExpired] = useState(EXPIRED_MAP['loading'])

  useEffect(() => {
    ;(async () => {
      const res = await getFooter()

      if (res.code === 210008) {
        setExpired(EXPIRED_MAP['expired'])
        return
      } else {
        setExpired(EXPIRED_MAP['notExpired'])
      }

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

  if (expired === 'loading') return null
  if (expired === 'expired') return <ExpiredPage />
  if (expired === 'notExpired')
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

  return null
}

export default MyApp
