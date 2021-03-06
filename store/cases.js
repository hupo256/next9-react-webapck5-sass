import { createContext, useContext, useState } from 'react'
import caseApi from '@service/caseApi'
import siteApi from '@service/siteApi'

const ctx = createContext(null)
export function CaseWrapper({ children }) {
  const [loading, setloading] = useState(false) // 加载与否
  const [searchTags, setsearchTags] = useState([]) // 筛选项们
  const [dataList, setdataList] = useState(null) // 所要展示的数据集
  const [curPage, setcurPage] = useState(1) // 初始化页数
  const [searchPara, setsearchPara] = useState({
    bedRooms: '',
    acreages: '',
    styles: '',
    bedroom: '',
    buildingArea: '',
    renovationCosts: '',
  }) // 选中的筛选参数

  function touchSearchTags(fromTag) {
    const apiTool = fromTag === 'sites' ? siteApi.siteParams : caseApi.queryCaseOptionsForWeb
    apiTool().then(res => {
      // console.log(res)
      if (!res?.data) return
      const { data } = res
      setsearchTags(data)
    })
  }

  function touchDataList(config = {}) {
    if (loading) return
    const num = config?.pageNum || 1
    setcurPage(num)
    setloading(true)
    const apiTool = config?.from === 'sites' ? siteApi.sitePageList : caseApi.queryCaseListForWeb
    const param = {
      ...searchPara,
      pageNum: 1,
      pageSize: 10,
    }
    delete config.from

    apiTool({ ...param, ...config }).then(res => {
      // console.log(res)
      if (!res?.data) return
      const { data } = res
      setdataList(data)
      setloading(false)
    })
  }

  const sharedState = {
    dataList,
    touchDataList,
    searchTags,
    touchSearchTags,
    searchPara,
    setsearchPara,
    curPage,
  }

  return <ctx.Provider value={sharedState}>{children}</ctx.Provider>
}

export function useCaseContext() {
  return useContext(ctx)
}
