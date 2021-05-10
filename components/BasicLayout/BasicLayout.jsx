import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from './BasicLayout.module.scss'
import _ from 'lodash'
import { HomeWrapper, useHomePageContext } from '@store/home'
import { MenuList, HeaderLayout } from '@components/Home'
import FooterComp from '@components/FooterComp/FooterComp.js'

import { Layout, Avatar } from 'antd'

const { Content } = Layout

const CompanyHeader = () => {
  return (
    <div className={styles.companyHeaderStyle}>
      <Avatar
        className={'avatar'}
        style={{ backgroundColor: '#FF7300', verticalAlign: 'middle' }}
        size="large"
        gap={20}
      >
        C
      </Avatar>
      <h1>我的装修公司</h1>
    </div>
  )
}

const Home = ({ children }) => {
  const { menuList, footerData } = useHomePageContext() // 获取全局 state 的方法

  return (
    <div className={styles.container}>
      <Head>
        <title>home</title>
        {/* <title>{authed ? 'Admin' : 'Public'}</title> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout className={styles.mainLayout}>
        <HeaderLayout
          left={<CompanyHeader />}
          middle={<MenuList menuList={menuList} />}
          right={
            <>
              <Image
                className={styles.phoneIcon}
                src={'/img/ic_phone_slices/ic_phone.png'}
                width={14}
                height={17}
                layout="fixed"
              />
              <span className={styles.phone}>800-123-1234</span>
            </>
          }
        />
        <Content className={styles.mainWrapper}>{children}</Content>
        <FooterComp data={footerData} />
      </Layout>
    </div>
  )
}

const HomePage = ({ children }) => (
  <HomeWrapper>
    <Home children={children} />
  </HomeWrapper>
)

export default HomePage
