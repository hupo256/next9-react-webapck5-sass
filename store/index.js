import { createContext, useContext, useState } from 'react'
import companyApi from '@service/companyApi'

const AppContext = createContext(null)
export function AppWrapper({ children }) {
  const [authed, setAuthed] = useState(false)
  const [companyData, setcompanyData] = useState(null)

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
    companyData,
    touchCompanyInfor,
  }

  return <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
}

export function useAppContext() {
  return useContext(AppContext)
}
