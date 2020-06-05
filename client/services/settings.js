import React, { createContext, useContext, useState } from 'react'
import { useCookies } from 'react-cookie'

export const SettingsContext = createContext()

const colorOptions = [
  { Purple: 'rebeccapurple' },
  { Pink: 'deeppink' },
  { Red: 'crimson' },
  { Yellow: 'gold' },
  { Lime: 'limegreen' },
  { Green: 'seagreen' },
  { Teal: 'teal' },
  { Ice: 'deepskyblue' },
  { Blue: 'mediumblue' },
  { Silver: 'lightsteelblue' },
  { Black: 'black' },
]

const settingsOptions = []

export const SettingsProvider = ({ children }) => {
  const [
    { color = 'rebeccapurple', screenFilter = 'lcd' } = {},
    setCookie,
  ] = useCookies()
  const [menu, setMenu] = useState(``)
  const setColor = (val) => setCookie('color', val)
  const setScreenFilter = (val) => setCookie('screenFilter', val)

  return (
    <SettingsContext.Provider
      value={{
        color,
        setColor,
        screenFilter,
        setScreenFilter,
        menu,
        setMenu,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => {
  const {
    color,
    setColor,
    screenFilter,
    setScreenFilter,
    menu,
    setMenu,
  } = useContext(SettingsContext)

  return {
    color,
    setColor,
    screenFilter,
    setScreenFilter,
    menu,
    setMenu,
  }
}
