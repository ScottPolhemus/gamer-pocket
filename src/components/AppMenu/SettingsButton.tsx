import * as React from 'react'

import { useSettings, MenuOption } from '../../services/settings'
import Icon from '../Icon'

import { SettingsLink, ToggleText, ToggleOutline } from './AppMenu.css'
const SettingsButton = () => {
  const { setMenu } = useSettings()

  return (
    <SettingsLink
      onClick={(event) => {
        event.stopPropagation()
        setMenu(MenuOption.Settings)
      }}
    >
      <ToggleText>Settings</ToggleText>
      <ToggleOutline tabIndex={0}>
        <Icon name="settings" />
      </ToggleOutline>
    </SettingsLink>
  )
}

export default SettingsButton
