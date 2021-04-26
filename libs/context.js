import { createContext, useContext } from 'react'

const AppContext = createContext(null)

export function AppWrapper({ children }) {
  let sharedState = {
    authed: false,
  }

  return <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
}

export function useAppContext() {
  return useContext(AppContext)
}
