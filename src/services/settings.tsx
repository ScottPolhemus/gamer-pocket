import * as React from 'react'
import useLocalStorageState from 'use-local-storage-state'

export enum ColorOption {
  Purple = 'rebeccapurple',
  Pink = 'deeppink',
  Red = 'crimson',
  Yellow = 'gold',
  Lime = 'limegreen',
  Green = 'seagreen',
  Teal = 'teal',
  Ice = 'deepskyblue',
  Blue = 'mediumblue',
  Silver = 'lightsteelblue',
  Black = 'black',
}

export enum ScreenFilterOption {
  None = 'none',
  LCD = 'lcd',
}

export enum MenuOption {
  Player = '',
  Settings = 'settings',
  Save = 'save',
}

interface SettingsContextValue {
  color: ColorOption
  setColor: (val: ColorOption) => void
  screenFilter: ScreenFilterOption
  setScreenFilter: (val: ScreenFilterOption) => void
  menu: MenuOption
  setMenu: (val: MenuOption) => void
}

export const SettingsContext = React.createContext<SettingsContextValue | null>(
  null
)

export const SettingsProvider = ({
  children,
}: {
  children: JSX.Element
}): JSX.Element => {
  const [menu, setMenu] = React.useState(MenuOption.Player)
  const [color, setColor] = useLocalStorageState('color', ColorOption.Purple)
  const [screenFilter, setScreenFilter] = useLocalStorageState(
    'screenFilter',
    ScreenFilterOption.LCD
  )

  const value: SettingsContextValue = {
    color,
    setColor,
    screenFilter,
    setScreenFilter,
    menu,
    setMenu,
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = (): SettingsContextValue => {
  const settings = React.useContext(SettingsContext)

  if (!settings) {
    throw new Error('Missing settings context')
  }

  return settings
}
