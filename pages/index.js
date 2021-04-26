import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import _ from 'lodash'
import { useAppContext } from '../libs/context'
import { Services, dummyDevDomain } from '../libs/services'

import { Button } from 'antd'

export const getServerSideProps = async () => {
  const getAllChannelsRes = await axios.get(Services.findAllChannels)

  const getFooterInfoRes = await axios.get(Services.findAllFooters)

  const getOtherJsonData = await axios.post(
    Services.findAllData,
    [
      {
        key: 'case',
        pageNum: 1,
        pageSize: 10,
      },
    ],
    {
      headers: { origin: dummyDevDomain }, // todo... delete it on prod
    },
  )

  return {
    props: {
      menu: getAllChannelsRes.data.data.list,
      footerData: getFooterInfoRes.data.data,
    }, // will be passed to the page component as props
  }
}

export default function Home({ menu, footerData }) {
  const contextValue = useAppContext()

  return (
    <div className={styles.container}>
      <Head>
        <title>PC PREVIEW 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className={styles.menuRoot}>
          {_.map(menu, (item, index) => {
            return (
              <a href={item.linkUrl} key={index} className={styles.menuItem}>
                {item.linkDisplayName}
              </a>
            )
          })}
        </div>
      </div>
      <main className={styles.main}></main>
      <Button />

      <footer className={styles.footer}>
        <p>{JSON.stringify(footerData, null, 4)}</p>
      </footer>
    </div>
  )
}
