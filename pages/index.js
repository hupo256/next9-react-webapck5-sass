import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import _ from 'lodash'
import { HomeWrapper } from '../libs/context'
import { useAppContext, useHomePageContext } from '../libs/context'
import EditMenu from '../components/EditMenu'
import { Services } from '../libs/services'
import cx from 'classnames'

import { Button, Layout, Avatar } from 'antd'
const { Header, Content, Footer, Icon } = Layout
// const { PhoneOutlined } = Icon

const FAKE_ACTIVE_INDEX = 4

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

const MAX_CHAR_MENU = 30 //todo... remove it
const MenuListComp = ({ menuList }) => {
  const [menuChunkList, setMenuChunkList] = useState([])
  const [chunkIndex, setChunkIndex] = useState(0)
  const [extraCharCount, setExtraCharCount] = useState([])

  const hasPrevious = () => {
    return !Boolean(chunkIndex - 1 < 0)
  }

  const hasNext = () => {
    return Boolean(chunkIndex + 1 < menuChunkList.length)
  }

  useEffect(() => {
    if (_.isEmpty(menuList)) return

    const menuListClone = menuList.slice() //clone state
    const chunkRes = []
    const extraCharCount = []
    while (menuListClone.length) {
      let charCount = 0
      let index = 0
      let oneChunk = []

      while (charCount <= 40 && !_.isNil(menuListClone[index])) {
        oneChunk.push(menuListClone[index])
        charCount += menuListClone[index]['websiteName'].length
        index++
      }

      menuListClone.splice(0, index)
      chunkRes.push(oneChunk)
      extraCharCount.push(charCount)
    }

    setMenuChunkList(chunkRes)
    setExtraCharCount(extraCharCount)
  }, [menuList])

  return (
    <div className={styles.menuWrapper}>
      <div
        className={styles.menuRoot}
        style={
          extraCharCount[chunkIndex] > 20
            ? { justifyContent: 'space-between' }
            : { justifyContent: 'flex-end', gap: '40px' }
        }
      >
        {_.map(menuChunkList[chunkIndex], (item, index) => {
          return (
            <div className={styles.menuItemWrapper} key={`menuItemWrapper-${index}`}>
              {index === 0 && hasPrevious() && (
                <div
                  className={styles.arrowWrapperPrev}
                  onClick={() => setChunkIndex(() => chunkIndex - 1)}
                >
                  <a className={styles.prevArrow}></a>
                </div>
              )}
              <a
                href={item.linkUrl}
                key={index}
                className={index === FAKE_ACTIVE_INDEX && styles.active}
              >
                {item.websiteName}
              </a>
              {index + 1 === menuChunkList[chunkIndex].length && hasNext() && (
                <div
                  className={styles.arrowWrapperNext}
                  onClick={() => setChunkIndex(chunkIndex + 1)}
                >
                  <a className={styles.nextArrow}></a>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const KeyFeatures = ({ pointsList }) => {
  return (
    <div className={styles.featurePoints}>
      {_.map(pointsList, (feature, index) => (
        <div key={index} className={styles.featurePoint}>
          <Image src={feature.imgUrl} layout="fixed" width={64} height={64} />
          <p className={styles.pointTitle}>{feature.title}</p>
          <p className={styles.pointSubTitle}>{feature.description}</p>
        </div>
      ))}
    </div>
  )
  // ))
}

const ChapterSection = ({ title, description }) => {
  return (
    <div className={styles.chapterSection}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  )
}

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

const Home = () => {
  const { authed, setAuthed } = useAppContext() // 获取全局 state 的方法
  const { menuList } = useHomePageContext() // 获取全局 state 的方法

  return (
    <div className={styles.container}>
      <Head>
        <title>{authed ? 'Admin' : 'Public'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout className={styles.mainLayout}>
        <Header className={styles.headerWrapper}>
          <span className={styles.headerLeft}>
            <CompanyHeader />
          </span>
          <span className={styles.headerRight}>
            <MenuListComp menuList={menuList} />
          </span>
          <span className={styles.contactHeader}>
            <Image
              className={styles.phoneIcon}
              src={'/img/ic_phone_slices/ic_phone.png'}
              width={14}
              height={17}
              layout="fixed"
            />
            <span className={styles.phone}>800-123-1234</span>
          </span>
        </Header>

        <Banner />

        <Content className={styles.mainWrapper}>
          <div className={styles.innerMain}>
            <ChapterSection title={'产品特点'} description={'颠覆传统家装企业'} />
            <KeyFeatures pointsList={DEMO_FEATURES} />
            <ChapterSection title={'装修案例'} description={'提前遇见未来的家'} />
            <KeyFeatures pointsList={_.slice(DEMO_FEATURES, 0, 3)} />
            <ChapterSection title={'首席设计师'} description={'定制全套装修方案'} />
            <KeyFeatures pointsList={_.slice(DEMO_FEATURES, 0, 3)} />
          </div>
        </Content>

        <Footer>FOOTER</Footer>
      </Layout>
      {/* <EditMenu /> */}
    </div>
  )
}

const HomePage = () => (
  <HomeWrapper>
    <Home />
  </HomeWrapper>
)

export default HomePage
