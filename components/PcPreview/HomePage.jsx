import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from './Home.module.scss'
import _ from 'lodash'
import CaseProjects from './Case/Case.jsx'
import MenuList from './Menu/Menu.jsx'
import KeyPoints from './KeyPoints/KeyPoints.jsx'
import HeaderLayout from './HeaderLayout/HeaderLayout.jsx'
import DesignerContent from './DesignerContent/DesignerContent.jsx'
import Articles from './Articles/Articles.jsx'
import LiveShow from './LiveShow/LiveShow.jsx'
import FooterComp from './FooterComp/FooterComp.jsx'

// import WebSetting from './WebSettingOut'
// import ChannelManage from '../ChannelManage'

import { Layout, Avatar, Button, Drawer } from 'antd'

import homePageService from '@service/pcPreview' //admin特需

const { getMenuList, getFooter, getPublishedData } = homePageService

const { Content } = Layout

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
  const [menuList, setMenuList] = useState([])
  const [footerData, setFooterData] = useState([])
  const [publishedData, setPublishedData] = useState([])

  const [showHeaderDrawer, setShowHeaderDrawer] = useState(false)
  const [showFooterDrawer, setShowFooterDrawer] = useState(false)

  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    ;(async () => {
      const res = await getMenuList({ keyword: '', pageNum: 1, pageSize: 18 })
      setMenuList(_.get(res, 'data.list', []))
    })()
    ;(async () => {
      const res = await getFooter()
      setFooterData(_.get(res, 'data', []))
    })()
    ;(async () => {
      const res = await getPublishedData([{ key: 'article', pageNum: 1, pageSize: 4 }])
      setPublishedData(_.get(res, 'data.templateJson.jsonData'), [])
    })()
  }, [refresh])

  return (
    <div className={styles.container}>
      <Head>
        <title>{footerData.title}</title>
        <meta name="keywords" content={footerData.keywords && JSON.parse(footerData.keywords).join(',')} />
        <meta name="description" content={footerData.content} />
      </Head>
      <Layout className={styles.mainLayout}>
        <div className={styles.editableWrapper}>
          {/* <div className={styles.editHeader}>
            <Button className={styles.editBtn} type="primary" onClick={() => setShowHeaderDrawer(true)}>
              编辑
            </Button>
          </div> */}
          <HeaderLayout
            left={
              <div className={styles.companyHeaderStyle}>
                <Avatar
                  src={footerData.icon}
                  className={'avatar'}
                  style={{ backgroundColor: '#FF7300', verticalAlign: 'middle' }}
                  size="large"
                  gap={20}
                >
                  C
                </Avatar>
                <h1>{footerData.companyName}</h1>
              </div>
            }
            middle={<MenuList menuList={menuList} />}
            right={
              <>
                <img className={styles.phoneIcon} src={'/img/ic_phone_slices/ic_phone.png'} />
                <span className={styles.phone}>{footerData.customerService}</span>
              </>
            }
          />
        </div>

        <div
          className={styles.banner}
          style={{ background: `url(${_.get(publishedData, '0.list.0.imgUrl')} ) no-repeat center center` }}
        />

        <Content className={styles.mainWrapper}>
          <ChapterLayout title={'产品特点'} description={'颠覆传统家装企业'}>
            <KeyPoints pointsList={_.get(publishedData, '1.list')} />
          </ChapterLayout>

          <ChapterLayout title={'装修案例'} description={'定制全套装修方案'}>
            <CaseProjects data={_.get(publishedData, '2.list')} />
          </ChapterLayout>

          <div className={styles.designerSectionWiderBackground}>
            <ChapterLayout title={'首席设计师'} description={'定制全套装修方案'}>
              <DesignerContent data={_.get(publishedData, '4.list')} />
            </ChapterLayout>
          </div>

          <ChapterLayout title={'装修攻略'} description={'一分钟了解家装'}>
            <Articles data={_.get(publishedData, '5.list')} />
          </ChapterLayout>

          <div className={styles.designerSectionWiderBackground}>
            <ChapterLayout title={'工地直播'} description={'全程透明 追踪可查'}>
              <LiveShow data={_.get(publishedData, '3.list')} />
            </ChapterLayout>
          </div>
        </Content>

        {/* <div className={styles.editableWrapper}> */}
        {/* <div className={styles.editHeader}>
            <Button className={styles.editBtn} type="primary" onClick={() => setShowFooterDrawer(true)}>
              编辑
            </Button>
          </div> */}
        <FooterComp data={footerData} />
        {/* </div> */}
      </Layout>

      {/* <Drawer title="编辑频道" placement="right" closable={true} onClose={() => {
          setRefresh(!refresh);
          setShowHeaderDrawer(false);
        }} visible={showHeaderDrawer} width={900}>
        <ChannelManage />
      </Drawer>

      <Drawer title="编辑公司信息" placement="right" closable={true} onClose={() => {
          setRefresh(!refresh);
          setShowFooterDrawer(false);
        }} visible={showFooterDrawer} width={600}>
        <WebSetting />
      </Drawer> */}

      <div className={styles.scrollToTop} onClick={() => scrollTo(0, 0)} />
    </div>
  )
}

export default Home
