import { createContext, useContext, useState } from 'react'
import caseApi from '@service/caseApi'
import siteApi from '@service/siteApi'

const ctx = createContext(null)
export function CaseWrapper({ children }) {
  const [searchTags, setsearchTags] = useState([]) // 筛选项们
  const [dataList, setdataList] = useState(null) // 所要展示的数据集
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
    })
  }

  const sharedState = {
    dataList,
    touchDataList,
    searchTags,
    touchSearchTags,
    searchPara,
    setsearchPara,
  }

  return <ctx.Provider value={sharedState}>{children}</ctx.Provider>
}

export function useCaseContext() {
  return useContext(ctx)
}
