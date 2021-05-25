import React, { useState, useEffect } from 'react'

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

import { typeMap, paramMap } from '@libs/constants.js'

import { Layout, Carousel, message } from 'antd'

import homePageService from '@service/pcPreview'

const { getMenuList, getFooter, getPublishedData } = homePageService

const { Content } = Layout

const ChapterLayout = ({ children, title, description }) => (
  <div className={styles.chapterWrapper}>
    <div className={styles.chapterSection}>
      <h2 className={styles.title}>{title}</h2>
      {/* <p className={styles.description}>{description}</p> */}
    </div>
    {children}
  </div>
)

const Home = () => {
  const [menuList, setMenuList] = useState([])
  const [footerData, setFooterData] = useState([])
  const [publishedData, setPublishedData] = useState([])
  const [totopShow, settotopShow] = useState(false)

  useEffect(() => {
    ;(async () => {
      const res = await getMenuList({ keyword: '', pageNum: 1, pageSize: 18 })
      setMenuList(_.get(res, 'data.list', []))
    })()
    ;(async () => {
      const res = await getPublishedData([{ key: 'article', pageNum: 1, pageSize: 4 }])
      setPublishedData(_.get(res, 'data.templateJson.jsonData'), [])
    })()
    ;(async () => {
      const res = await getFooter()
      setFooterData(_.get(res, 'data', []))
    })()
  }, [])

  useEffect(() => {
    document.addEventListener('scroll', conScroll)
    return () => {
      document.removeEventListener('scroll', conScroll)
    }
  }, [])

  function conScroll() {
    const clientHeight = document.documentElement.clientHeight //可视区域高度
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop //滚动条滚动高度
    settotopShow(scrollTop > clientHeight / 3)
  }

  if (_.isEmpty(menuList) || _.isEmpty(publishedData) || _.isEmpty(footerData)) return null

  return (
    <div className={styles.container}>
      <Layout className={styles.mainLayout}>
        <div className={styles.editableWrapper}>
          <HeaderLayout
            left={
              <div className={styles.companyHeaderStyle}>
                <img
                  src={footerData.logo}
                  className={styles.logoStyle}
                  onClick={() => (window.location.href = '/')}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            }
            middle={<MenuList menuList={menuList} />}
            right={
              <div className={styles.contactHeader}>
                <img className={styles.phoneIcon} src={'/img/ic_phone_slices/ic_phone.png'} />
                <span className={styles.phone}>{footerData.customerService}</span>
              </div>
            }
          />
        </div>

        <Carousel autoplay>
          {_.map(_.find(publishedData, { flag: 'banner' })['list'], (item, index) => (
            <div
              key={`banner-${index}`}
              onClick={() => {
                if (!item.uid) {
                  return
                }
                if (item.type === 'games') {
                  message.warning('PC端不允许跳转到小游戏')
                  return
                }
                window.location.href = `/${typeMap[item.type]}/details?${paramMap[item.type]}=${item.uid}`
              }}
            >
              <h3
                className={styles.banner}
                style={{
                  backgroundImage: `url(${_.get(item, 'imgUrl')})`,
                }}
              >
                {' '}
              </h3>
            </div>
          ))}
        </Carousel>

        <Content className={styles.mainWrapper}>
          <ChapterLayout title={'产品特点'} description={'颠覆传统家装企业'}>
            <KeyPoints pointsList={_.find(publishedData, { flag: 'highlights' })['list']} />
          </ChapterLayout>

          <ChapterLayout title={'装修案例'} description={'定制全套装修方案'}>
            <CaseProjects data={_.find(publishedData, { flag: 'case' })['list']} />
          </ChapterLayout>

          <div className={styles.designerSectionWiderBackground}>
            <ChapterLayout title={'参观工地'} description={'全程透明 追踪可查'}>
              <LiveShow data={_.find(publishedData, { flag: 'site' })['list']} />
            </ChapterLayout>
          </div>

          <ChapterLayout title={'首席设计师'} description={'定制全套装修方案'}>
            <DesignerContent data={_.find(publishedData, { flag: 'design' })['list']} />
          </ChapterLayout>

          <div className={styles.designerSectionWiderBackground}>
            <ChapterLayout title={'装修攻略'} description={'一分钟了解家装'}>
              <Articles data={_.slice(_.find(publishedData, { flag: 'article' })['list'], 0, 3)} />
            </ChapterLayout>
          </div>
        </Content>

        <FooterComp data={footerData} />
      </Layout>

      <div className={`${styles.scrollToTop} ${totopShow ? styles.show : ''}`} onClick={() => scrollTo(0, 0)} />
    </div>
  )
}

export default Home
