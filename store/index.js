import { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)
export function AppWrapper({ children }) {
  const [authed, setAuthed] = useState(false)
  const [menuFetched, setMenuFetched] = useState(false)
  const [companyInfoFetched, setCompanyInfoFetched] = useState(false)

  const sharedState = {
    authed,
    setAuthed,
    setMenuFetched,
    menuFetched,
    companyInfoFetched,
    setCompanyInfoFetched,
  }

  return <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
}

export function useAppContext() {
  return useContext(AppContext)
}
