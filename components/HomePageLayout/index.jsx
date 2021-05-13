import React, { useState, useEffect } from 'react'
import styles from './HomePageLayout.module.scss'
import _ from 'lodash'
import MenuList from '../PcPreview/Menu/Menu.jsx'
import HeaderLayout from '../PcPreview/HeaderLayout/HeaderLayout.jsx'
import FooterComp from '../PcPreview/FooterComp/FooterComp.jsx'
import { Layout, Avatar } from 'antd'
import homePageService from '@service/pcPreview' //admin特需

const { getMenuList, getFooter } = homePageService
const { Content } = Layout

const Home = ({ children }) => {
  const [menuList, setMenuList] = useState([])
  const [footerData, setFooterData] = useState([])
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
  }, [refresh])

  return (
    <div className={styles.container}>
      <Layout className={styles.mainLayout}>
        <div className={styles.editableWrapper}>
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
        <Content className={styles.mainWrapper}>{children}</Content>
        <FooterComp data={footerData} />
      </Layout>
      <div className={styles.scrollToTop} onClick={() => scrollTo(0, 0)} />
    </div>
  )
}

export default Home
