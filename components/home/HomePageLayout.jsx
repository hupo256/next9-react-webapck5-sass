import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from './Home.module.scss'
import _ from 'lodash'
// import CaseProjects from './Case/Case.jsx'
import MenuList from './Menu/Menu.jsx'
// import KeyPoints from './KeyPoints/KeyPoints.jsx'
import HeaderLayout from './HeaderLayout/HeaderLayout.jsx'
// import DesignerContent from './DesignerContent/DesignerContent.jsx'
// import Articles from './Articles/Articles.jsx'
// import LiveShow from './LiveShow/LiveShow.jsx'
import FooterComp from './FooterComp/FooterComp.js'

import allData from './data/response_1619664888803.json'
import allMenusJson from './data/getAllMenus.json'
import footerDataJson from './data/footer.json'

import { Layout, Avatar, Button, Drawer } from 'antd'

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

const Banner = () => {
  return <div className={styles.banner}></div>
}

const ChapterLayout = ({ children, title, description }) => (
  <div className={styles.chapterWrapper}>
    <div className={styles.chapterSection}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
    {children}
  </div>
)

const Home = ({ children, title = '首页' }) => {
  const [menuList, setMenuList] = useState([])
  const [footerData, setFooterData] = useState([])

  const [showHeaderDrawer, setShowHeaderDrawer] = useState(false)
  const [showFooterDrawer, setShowFooterDrawer] = useState(false)

  useEffect(async () => {
    // todo
    // const { data } = await Services.findAllChannels()
    // const footer = await Services.findAllFooters()

    setMenuList(_.get(allMenusJson, 'data.list', []))
    setFooterData(footerDataJson.data)
  })

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout className={styles.mainLayout}>
        <div className={styles.editableWrapper}>
          <HeaderLayout
            left={<CompanyHeader />}
            middle={<MenuList menuList={menuList} />}
            right={
              <>
                <img className={styles.phoneIcon} src={'/img/ic_phone_slices/ic_phone.png'}></img>
                <span className={styles.phone}>{'800-123-1234'}</span>
              </>
            }
          />
        </div>
        <Banner />

        <Content className={styles.mainWrapper}>{children}</Content>
        <FooterComp data={footerData} />
      </Layout>
    </div>
  )
}

export default Home
