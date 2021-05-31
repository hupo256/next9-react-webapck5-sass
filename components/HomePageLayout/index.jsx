import React, { useState, useEffect } from 'react'
import { Layout, Avatar } from 'antd'
import Header from '@components/header'
import MenuList from '@components/PcPreview/Menu/Menu.jsx'
import HeaderLayout from '@components/PcPreview/HeaderLayout/HeaderLayout.jsx'
import FooterComp from '@components/PcPreview/FooterComp/FooterComp.jsx'
import basicApi from '@service/basicApi'
import styles from './HomePageLayout.module.scss'
import Regisiter from '../PcPreview/Regisiter/Regisiter.jsx'
const { Content } = Layout
const { getMenuList, companyinfoView } = basicApi

export default function BasicLayout(props) {
  const { children, headConfig, pushType } = props
  const [menuList, setMenuList] = useState([])
  const [footerData, setFooterData] = useState([])
  const [totopShow, settotopShow] = useState(false)
  const [regisiterFromVisiable, setRegisiterFromVisiable] = useState(true) //marketing 独有

  useEffect(() => {
    touchBasicInfor()

    document.addEventListener('scroll', conScroll)
    return () => {
      document.removeEventListener('scroll', conScroll)
    }
  }, [])

  async function touchBasicInfor() {
    const [menu, companyInfor] = await Promise.all([
      getMenuList({ keyword: '', pageNum: 1, pageSize: 18 }),
      companyinfoView(),
    ])
    setMenuList(menu?.data?.list)
    setFooterData(companyInfor?.data)
  }

  function conScroll() {
    const clientHeight = document.documentElement.clientHeight //可视区域高度
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop //滚动条滚动高度
    settotopShow(scrollTop > clientHeight / 3)
  }

  return (
    <>
      <Header {...headConfig} />
      <div className={styles.container}>
        <Layout className={styles.mainLayout}>
          <div className={styles.editableWrapper}>
            <HeaderLayout
              left={
                <div className={styles.companyHeaderStyle}>
                  <img
                    src={footerData?.logo}
                    className={styles.logoStyle}
                    onClick={() => (window.location.href = '/')}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              }
              middle={<MenuList menuList={menuList} />}
              right={
                <>
                  <img
                    className={styles.phoneIcon}
                    src={
                      'https://img.inbase.in-deco.com/crm_saas/release/20210514/26b37fd6c4814b6ba0f589a8e8551f0b/ic_phone.png'
                    }
                  />
                  <span className={styles.phone}>{footerData?.customerService}</span>
                </>
              }
            />
          </div>
          <Content className={styles.mainWrapper}>{children}</Content>
          <FooterComp data={footerData} />
          {regisiterFromVisiable && <Regisiter setRegisiterFromVisiable={setRegisiterFromVisiable} type={pushType} />}
        </Layout>
        <div className={`${styles.scrollToTop} ${totopShow ? styles.show : ''}`} onClick={() => scrollTo(0, 0)} />
      </div>
    </>
  )
}
