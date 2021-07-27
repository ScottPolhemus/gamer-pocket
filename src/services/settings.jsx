import React, { createContext, useContext, useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'

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
  const [menu, setMenu] = useState(``)
  
  const [color, setColor] = useLocalStorageState('color', 'rebeccapurple')
  const [screenFilter, setScreenFilter] = useLocalStorageState('screenFilter', 'lcd')

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
