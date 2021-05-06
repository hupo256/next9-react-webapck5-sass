import { createContext, useContext, useState } from 'react'
import caseApi from '@service/caseApi'

// import queryCaseOptionsForWeb from './mock/queryCaseOptionsForWeb.json'
// import queryCaseListForWeb from './mock/queryCaseListForWeb.json'
// import view from './mock/view.json'

const ctx = createContext(null)
export function CaseWrapper({ children }) {
  const [authed, setAuthed] = useState('jack')
  const [searchTags, setsearchTags] = useState([])
  const [caseData, setcaseData] = useState(null)
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

  const sharedState = {
    authed,
    setAuthed,
    caseData,
    setcaseData,
    touchCaseData,
    searchTags,
    setsearchTags,
    touchSearchTags,
    searchPara,
    setsearchPara,
  }

  return <ctx.Provider value={sharedState}>{children}</ctx.Provider>
}

export function useCaseContext() {
  return useContext(ctx)
}
