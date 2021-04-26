import Head from 'next/head'
import styles from '../styles/Home.module.css'
import _ from 'lodash'
import { useAppContext } from '../libs/context'
import { Services } from '../libs/services'

import { Button } from 'antd'

export const getServerSideProps = async () => {
  const resMenu = await Services.findAllChannels()
  const resFooter = await Services.findAllFooters()

  // const resAll = await Services.findAllData([
  //   {
  //     key: 'case',
  //     pageNum: 1,
  //     pageSize: 10,
  //   },
  // ])

  return {
    props: {
      menu: resMenu.data.data.list,
      footerData: resFooter.data.data,
    }, // will be passed to the page component as props
  }
}

export default function Home({ menu, footerData }) {
  const contextValue = useAppContext() // 获取全局 state 的方法

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
