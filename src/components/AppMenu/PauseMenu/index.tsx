import * as React from 'react'

import { usePlayer } from '../../../services/player'
import { useSettings, MenuOption } from '../../../services/settings'
import { MenuTitle, MenuGroup, MenuButton } from '../AppMenu.css'

const PauseMenu = () => {
  const { restart, stop } = usePlayer()
  const { setMenu } = useSettings()

  return (
    <>
      <MenuTitle>Paused - Tap screen to resume</MenuTitle>
      <MenuGroup horizontal>
        <MenuButton
          onClick={(e) => {
            e.stopPropagation()
            restart()
          }}
        >
          Restart
        </MenuButton>
        <MenuButton
          onClick={(e) => {
            e.stopPropagation()
            stop()
          }}
        >
          Change ROM
        </MenuButton>
      </MenuGroup>
      <MenuButton
        onClick={(e) => {
          e.stopPropagation()
          setMenu(MenuOption.Save)
        }}
      >
        Manage Save
      </MenuButton>
    </>
  )
}

export default PauseMenu
