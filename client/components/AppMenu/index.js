import React from 'react'

import { usePlayer } from '../../services/player'
import { useSettings } from '../../services/settings'
import { MenuContainer, MenuBody, MenuFooter, MenuButton } from './AppMenu.css'
import StartMenu from './StartMenu'
import PauseMenu from './PauseMenu'
import SaveMenu from './SaveMenu'
import SettingsMenu from './SettingsMenu'
import MuteButton from './MuteButton'
import SettingsButton from './SettingsButton'

const AppMenu = () => {
  const { paused } = usePlayer()
  const { menu, setMenu } = useSettings()

  return (
    <MenuContainer>
      <MenuBody menu={menu} paused={paused}>
        {!menu && paused ? (
          <PauseMenu />
        ) : (
          <>
            {!menu && <StartMenu />}
            {menu === `settings` && <SettingsMenu />}
            {menu === `save` && <SaveMenu />}
          </>
        )}
      </MenuBody>
      <MenuFooter>
        {menu ? (
          <MenuButton
            onClick={(e) => {
              e.stopPropagation()
              setMenu('')
            }}
          >
            Back
          </MenuButton>
        ) : null}
        {!menu && <MuteButton />}
        {!menu && <SettingsButton />}
      </MenuFooter>
    </MenuContainer>
  )
}

export default AppMenu
