import { createContext, useContext, useState } from 'react'
import caseApi from '../service/caseApi'
import companyApi from '../service/companyApi'

import queryCaseOptionsForWeb from './mock/queryCaseOptionsForWeb.json'
import queryCaseListForWeb from './mock/queryCaseListForWeb.json'
import view from './mock/view.json'

const AppContext = createContext(null)
export function AppWrapper({ children }) {
  const [authed, setAuthed] = useState('jack')
  const [searchTags, setsearchTags] = useState([])
  const [caseData, setcaseData] = useState(null)
  const [companyData, setcompanyData] = useState(null)
  const [searchPara, setsearchPara] = useState({})

  function touchSearchTags() {
    caseApi.queryCaseOptionsForWeb().then(res => {
      console.log(res)
      if (!res?.data) return
      const { data } = res
      setsearchTags(data)
    })
  }

  function touchCaseData(config = {}) {
    const param = {
      ...searchPara,
      pageNum: 1,
      pageSize: 10,
    }
    caseApi.queryCaseListForWeb({ ...param, ...config }).then(res => {
      console.log(res)
      if (!res?.data) return
      const { data } = res
      setcaseData(data)
    })
  }

  function touchCompanyInfor() {
    companyApi.companyPcView().then(res => {
      console.log(res)
      if (!res?.data) return
      setcompanyData(res.data)
    })
  }

  const sharedState = {
    authed,
    setAuthed,
    caseData,
    setcaseData,
    touchCaseData,
    searchTags,
    setsearchTags,
    touchSearchTags,
    companyData,
    setcompanyData,
    searchPara,
    setsearchPara,
  }

  return <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
}

export function useAppContext() {
  return useContext(AppContext)
}
