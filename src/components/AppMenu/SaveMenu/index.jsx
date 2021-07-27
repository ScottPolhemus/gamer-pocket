import React, { useEffect } from 'react'

import { usePlayer } from '../../../services/player'
import { useSettings } from '../../../services/settings'
import { MenuTitle, MenuGroup } from '../AppMenu.css'
import ExportSaveButton from './ExportSaveButton'
import ImportSaveButton from './ImportSaveButton'

const SaveMenu = () => {
  const { loadedGame, currentGame } = usePlayer()
  const { setMenu } = useSettings()
  const game = loadedGame || currentGame

  useEffect(() => {
    if (!game) {
      setMenu(``)
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
