import React from 'react'

import { useSettings } from '../../services/settings'
import Icon from '../Icon'
import { SettingsLink, ToggleText, ToggleOutline } from './AppMenu.css'

const SettingsButton = () => {
  const { setMenu } = useSettings()

  return (
    <SettingsLink
      onClick={(event) => {
        event.stopPropagation()
        setMenu('settings')
      }}
    >
      <ToggleText>Settings</ToggleText>
      <ToggleOutline tabIndex="0">
        <Icon name="settings" />
      </ToggleOutline>
    </SettingsLink>
  )
}

export default SettingsButton
