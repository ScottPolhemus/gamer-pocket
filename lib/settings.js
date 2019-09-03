import { createContext, useContext } from 'react'
import { useCookies } from 'react-cookie'

export const SettingsContext = createContext()

export const SettingsProvider = ({children}) => {
  const [{
    color = 'rebeccapurple',
    screenFilter = 'lcd'
  }, setCookie] = useCookies()
  const setColor = (val) => setCookie('color', val)
  const setScreenFilter = (val) => setCookie('screenFilter', val)

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
