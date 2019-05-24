import { createContext, useCallback, useContext } from 'react'
import { useCookies } from 'react-cookie'

export const SettingsContext = createContext()

export const SettingsProvider = ({children}) => {
  const [{
    color = 'rebeccapurple',
    screenFilter = 'lcd'
  }, setCookie] = useCookies()
  const setColor = useCallback((val) => setCookie(`color`, val), [])
  const setScreenFilter = useCallback((val) => setCookie(`screenFilter`, val), [])

  return (
    <SettingsContext.Provider value={{
      color,
      setColor,
      screenFilter,
      setScreenFilter
    }}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => {
  const {
    color,
    setColor,
    screenFilter,
    setScreenFilter
  } = useContext(SettingsContext)

  return {
    color,
    setColor,
    screenFilter,
    setScreenFilter
  }
}
