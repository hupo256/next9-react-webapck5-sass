import React, { createContext, useContext, useState, useEffect } from 'react'
import { Services } from '@libs/services'

const HomePageContext = createContext(null)

export function HomeWrapper({ children }) {
  // const { authed } = useAppContext()
  const [menuList, setMenuList] = useState([])

  // 设置 authed 依赖，当全局 登陆 状态变更的时候，刷新其 子 Context。
  useEffect(async () => {
    const { data } = await Services.findAllChannels()
    setMenuList(_.get(data, 'list', []))
  }, [])

  const sharedState = {
    menuList,
  }

  return <HomePageContext.Provider value={sharedState}>{children}</HomePageContext.Provider>
}

export function useHomePageContext() {
  return useContext(HomePageContext)
}
