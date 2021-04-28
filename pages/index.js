import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import _ from 'lodash'
import { HomeWrapper } from '../libs/context'
import { useAppContext, useHomePageContext } from '../libs/context'
import EditMenu from '../components/EditMenu'
import { Services } from '../libs/services'
import { Button, Layout, Avatar } from 'antd'
const { Header, Content, Footer } = Layout

const DEMO_FEATURES = [
  {
    imgUrl: '',
    title: '精准报价',
    description: 'ERP+BIM',
  },
  {
    imgUrl: '',
    title: '精准报价',
    description: 'ERP+BIM',
  },
  {
    imgUrl: '',
    title: '精准报价',
    description: 'ERP+BIM',
  },
  {
    imgUrl: '',
    title: '精准报价',
    description: 'ERP+BIM',
  },
  {
    imgUrl: '',
    title: '精准报价',
    description: 'ERP+BIM',
  },
  {
    imgUrl: '',
    title: '精准报价',
    description: 'ERP+BIM',
  },
]

const MenuListComp = ({ menuList }) => {
  const [menuChunkList, setMenuChunkList] = useState([])
  const [chunkIndex, setChunkIndex] = useState(0)

  const hasPrevious = () => {
    return !Boolean(chunkIndex - 1 < 0)
  }

  const hasNext = () => {
    return Boolean(chunkIndex + 1 < menuChunkList.length)
  }

  useEffect(() => {
    setMenuChunkList(_.chunk(menuList, 8))
  }, [menuList])

  return (
    <div className={styles.menuWrapper}>
      {hasPrevious() && (
        <Button type="link" onClick={() => setChunkIndex(() => chunkIndex - 1)}>
          {'<'}
        </Button>
      )}
      <div className={styles.menuRoot}>
        {_.map(menuChunkList[chunkIndex], (item, index) => {
          return (
            <a href={item.linkUrl} key={index} className={styles.menuItem}>
              {item.websiteName}
            </a>
          )
        })}
      </div>
      {hasNext() && (
        <Button type="link" onClick={() => setChunkIndex(chunkIndex + 1)}>
          {'>'}
        </Button>
      )}
    </div>
  )
}

const KeyFeatures = ({ pointsList }) => {
  return (
    <div className={styles.featurePoints}>
      {_.map(pointsList, (feature, index) => (
        <div key={index} className={styles.featurePoint}>
          <p>{feature.imgUrl}</p>
          <p>{feature.title}</p>
          <p>{feature.description}</p>
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

const Home = () => {
  const { authed, setAuthed } = useAppContext() // 获取全局 state 的方法
  const { menuList } = useHomePageContext() // 获取全局 state 的方法

  return (
    <div className={styles.container}>
      <Head>
        <title>{authed ? 'Admin' : 'Public'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout style={{ minHeight: '100vh' }}>
        <Header className={styles.headerWrapper}>
          <span className={styles.headerLeft}>
            <CompanyHeader />
          </span>
          <span className={styles.headerRight}>
            <MenuListComp menuList={menuList} />
          </span>
        </Header>

        <div className={styles.banner}>
          <h3 className={styles.firstLine}>整装|省钱|省力|省心</h3>
          <h1 className={styles.secondLine}>一站式装修服务</h1>
          <h1 className={styles.thirdLine}>让你有限的空间更加完美，我们能做到！</h1>
        </div>
        <Content className={styles.mainWrapper}>
          <div className={styles.innerMain}>
            <ChapterSection title={'产品特点'} description={'颠覆传统家装企业'} />
            <KeyFeatures pointsList={DEMO_FEATURES} />
            <ChapterSection title={'产品特点'} description={'颠覆传统家装企业'} />
            <KeyFeatures pointsList={_.slice(DEMO_FEATURES, 0, 3)} />
          </div>
        </Content>

        <Footer>FOOTER</Footer>
      </Layout>
      <EditMenu />
    </div>
  )
}

const HomePage = () => (
  <HomeWrapper>
    <Home />
  </HomeWrapper>
)

export default HomePage
