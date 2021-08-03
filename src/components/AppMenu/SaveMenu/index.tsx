import * as React from 'react'

import { usePlayer } from '../../../services/player'
import { useSettings, MenuOption } from '../../../services/settings'
import { MenuTitle, MenuGroup } from '../AppMenu.css'
import ExportSaveButton from './ExportSaveButton'
import ImportSaveButton from './ImportSaveButton'

const SaveMenu = () => {
  const { loadedGame, currentGame } = usePlayer()
  const { setMenu } = useSettings()
  const game = loadedGame || currentGame

  React.useEffect(() => {
    if (!game) {
      setMenu(MenuOption.Player)
    }
  }, [loadedGame, currentGame])

  return (
    <>
      <MenuTitle>{game}.sav</MenuTitle>
      <MenuGroup>
        <ImportSaveButton />
        <ExportSaveButton />
      </MenuGroup>
    </>
  )
}

export default SaveMenu
