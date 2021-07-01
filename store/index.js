import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null)
export function AppWrapper({ children }) {
  const [authed, setAuthed] = useState(false)
  const [menuFetched, setMenuFetched] = useState(false)
  const [companyInfoFetched, setCompanyInfoFetched] = useState(false)
  const [headless, setHeadless] = useState(false)

  useEffect(() => {
    const urlInstance = new URL(location.href)
    const res = urlInstance.searchParams.get('headless')
    if (res === '1') {
      setHeadless(true)
      document.body.classList.add('headless')
      setMenuFetched(true)
      return
    }

    setHeadless(false)
    setMenuFetched(false)
  }, [location.href])

  const sharedState = {
    authed,
    setAuthed,
    menuFetched,
    setMenuFetched,
    companyInfoFetched,
    setCompanyInfoFetched,
    headless,
  }

  return <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
}

export function useAppContext() {
  return useContext(AppContext)
}
