import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import _ from 'lodash'
import { useAppContext, useHomePageContext, HomeWrapper } from '@libs/context'
import { CaseProjects, MenuList, KeyPoints, HeaderLayout, DesignerContent, Articles, LiveShow } from '@components/home'
import FooterComp from '@components/FooterComp/FooterComp.js'

import { Layout, Avatar, Button, Drawer } from 'antd'

const { Content } = Layout

const DEMO_FEATURES = [
  {
    imgUrl: '/img/points/ic_design.png',
    title: '精准报价',
    description: 'ERP+BIM',
  },
  {
    imgUrl: '/img/points/ic_flag.png',
    title: '资深设计',
    description: 'ERP+BIM',
  },
  {
    imgUrl: '/img/points/ic_home.png',
    title: '优质选材',
    description: '均 F2C一线大牌',
  },
  {
    imgUrl: '/img/points/ic_offer.png',
    title: '精准报价',
    description: 'ERP+BIM',
  },
  {
    imgUrl: '/img/points/ic_service.png',
    title: '无忧服务',
    description: '软装家电 10年免费续保',
  },
  {
    imgUrl: '/img/points/ic_sofa.png',
    title: '资深设计',
    description: '100+设计师提供专业服务',
  },
]

const DEMO_CASES = [
  {
    url: '/cases/1',
    imgUrl: '/img/home_cases/img_1.png',
    text: '兰亭盛会| 100 | 三室一厅 | 25.6万',
  },
  {
    url: '/cases/2',
    imgUrl: '/img/home_cases/img_2.png',
    text: '兰亭盛会| 200 | 三室一厅 | 25.6万',
  },
  {
    url: '/cases/3',
    imgUrl: '/img/home_cases/img_3.png',
    text: '兰亭盛会| 300 | 三室一厅 | 25.6万',
  },
  {
    url: '/cases/4',
    imgUrl: '/img/home_cases/img_4.png',
    text: '兰亭盛会| 400 | 三室一厅 | 25.6万',
  },
  {
    url: '/cases/5',
    imgUrl: '/img/home_cases/img_5.png',
    text: '兰亭盛会| 500 | 三室一厅 | 25.6万',
  },
]

const DEMO_SHOWS = [
  {
    url: '/cases/1',
    imgUrl: '/img/liveshow/直播1.png',
    text: '兰亭盛会| 100 | 三室一厅 | 25.6万',
  },
  {
    url: '/cases/2',
    imgUrl: '/img/liveshow/直播2.png',
    text: '兰亭盛会| 200 | 三室一厅 | 25.6万',
  },
  {
    url: '/cases/3',
    imgUrl: '/img/liveshow/直播3.png',
    text: '兰亭盛会| 300 | 三室一厅 | 25.6万',
  },
]

const DEMO_DESIGNER = [
  {
    designer: {
      name: '刘小姐',
      title: '总设计师',
      content: '用心打造高品质专属空间，从事设计8年以来力争用设计改变每一个用户的生活环境。',
    },
    imgUrl: '/img/designer/案例1.png',
    imgUserUrl: '/img/designer/设计师1.png',
  },
  {
    designer: {
      name: '王先生',
      title: '总设计师',
      content: '用心打造高品质专属空间，从事设计8年以来力争用设计改变每一个用户的生活环境。',
    },
    imgUrl: '/img/designer/案例2.png',
    imgUserUrl: '/img/designer/设计师2.png',
  },
  {
    designer: {
      name: '陈先生',
      title: '总设计师',
      content: '用心打造高品质专属空间，从事设计8年以来力争用设计改变每一个用户的生活环境。',
    },
    imgUrl: '/img/designer/案例3.png',
    imgUserUrl: '/img/designer/设计师3.png',
  },
]

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

const Home = () => {
  const { authed, setAuthed } = useAppContext()
  const { menuList, footerData } = useHomePageContext() // 获取全局 state 的方法
  const [showHeaderDrawer, setShowHeaderDrawer] = useState(false)
  const [showFooterDrawer, setShowFooterDrawer] = useState(false)

  return (
    <div className={styles.container}>
      <Head>
        <title>{authed ? 'Inner User' : 'Public User'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout className={styles.mainLayout}>
        <div className={styles.editableWrapper}>
          <div className={styles.editHeader}>
            <Button className={styles.editBtn} type="primary" onClick={() => setShowHeaderDrawer(true)}>
              编辑
            </Button>
          </div>
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
        </div>
        <Banner />

        <Content className={styles.mainWrapper}>
          <ChapterLayout title={'产品特点'} description={'颠覆传统家装企业'}>
            <KeyPoints pointsList={DEMO_FEATURES} />
          </ChapterLayout>
          {/* <ChapterLayout title={'产品特点'} description={'颠覆传统家装企业'}>
            <KeyPoints pointsList={_.slice(DEMO_FEATURES, 0, 5)} />
          </ChapterLayout> */}
          {/* <ChapterLayout title={'产品特点'} description={'颠覆传统家装企业'}>
            <KeyPoints pointsList={_.slice(DEMO_FEATURES, 0, 4)} />
          </ChapterLayout>
          <ChapterLayout title={'产品特点'} description={'颠覆传统家装企业'}>
            <KeyPoints pointsList={_.slice(DEMO_FEATURES, 0, 3)} />
          </ChapterLayout>
          <ChapterLayout title={'产品特点'} description={'颠覆传统家装企业'}>
            <KeyPoints pointsList={_.slice(DEMO_FEATURES, 0, 2)} />
          </ChapterLayout>
          <ChapterLayout title={'产品特点'} description={'颠覆传统家装企业'}>
            <KeyPoints pointsList={_.slice(DEMO_FEATURES, 0, 1)} />
          </ChapterLayout> */}
          {/* <ChapterLayout title={'装修案例'} description={'定制全套装修方案'}>
            <CaseProjects data={_.slice(DEMO_CASES, 0, 1)} />
          </ChapterLayout>
          <ChapterLayout title={'装修案例'} description={'定制全套装修方案'}>
            <CaseProjects data={_.slice(DEMO_CASES, 0, 2)} />
          </ChapterLayout>
          <ChapterLayout title={'装修案例'} description={'定制全套装修方案'}>
            <CaseProjects data={_.slice(DEMO_CASES, 0, 3)} />
          </ChapterLayout>
          <ChapterLayout title={'装修案例'} description={'定制全套装修方案'}>
            <CaseProjects data={_.slice(DEMO_CASES, 0, 4)} />
          </ChapterLayout> */}
          <ChapterLayout title={'装修案例'} description={'定制全套装修方案'}>
            <CaseProjects data={_.slice(DEMO_CASES, 0, 5)} />
          </ChapterLayout>

          <div className={styles.designerSectionWiderBackground}>
            <ChapterLayout title={'首席设计师'} description={'定制全套装修方案'}>
              <DesignerContent data={_.slice(DEMO_DESIGNER, 0, 3)} />
            </ChapterLayout>
          </div>

          <ChapterLayout title={'装修攻略'} description={'一分钟了解家装'}>
            <Articles />
          </ChapterLayout>

          <div className={styles.designerSectionWiderBackground}>
            <ChapterLayout title={'工地直播'} description={'全程透明 追踪可查'}>
              <LiveShow data={_.slice(DEMO_SHOWS, 0, 3)} />
            </ChapterLayout>
          </div>
          {/* <div className={styles.designerSectionWiderBackground}>
            <ChapterLayout title={'工地直播'} description={'全程透明 追踪可查'}>
              <LiveShow data={_.slice(DEMO_SHOWS, 0, 2)} />
            </ChapterLayout>
          </div>
          <div className={styles.designerSectionWiderBackground}>
            <ChapterLayout title={'工地直播'} description={'全程透明 追踪可查'}>
              <LiveShow data={_.slice(DEMO_SHOWS, 0, 1)} />
            </ChapterLayout>
          </div> */}
        </Content>

        <div className={styles.editableWrapper}>
          <div className={styles.editHeader}>
            <Button className={styles.editBtn} type="primary" onClick={() => setShowFooterDrawer(true)}>
              编辑
            </Button>
          </div>
          <FooterComp data={footerData} />
        </div>
      </Layout>

      <Drawer
        title="编辑频道"
        placement="right"
        closable={true}
        onClose={() => setShowHeaderDrawer(false)}
        visible={showHeaderDrawer}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>

      <Drawer
        title="编辑公司信息"
        placement="right"
        closable={true}
        onClose={() => setShowFooterDrawer(false)}
        visible={showFooterDrawer}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  )
}

const HomePage = () => (
  <HomeWrapper>
    <Home />
  </HomeWrapper>
)

export default HomePage
