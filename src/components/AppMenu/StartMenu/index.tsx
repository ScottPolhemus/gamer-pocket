import * as React from 'react'

import { usePlayer } from '../../../services/player'
import { MenuTitle, MenuButton, MenuGroup } from '../AppMenu.css'
import GameSelect from './GameSelect'

const SelectGame = (): JSX.Element => {
  const { playerRef, initialized, loadedGame, freeze, start, restart, resume } =
    usePlayer()
  const [selectedGame, setSelectedGame] = React.useState('')

  return (
    <>
      <MenuGroup>
        <GameSelect
          selectedGame={selectedGame}
          setSelectedGame={setSelectedGame}
        />
      </MenuGroup>
      {!!(initialized && selectedGame && !loadedGame) && (
        <MenuTitle>Loading...</MenuTitle>
      )}
      {!!(initialized && selectedGame && loadedGame) && (
        <MenuGroup horizontal>
          <>
            <MenuButton
              onClick={(e) => {
                e.stopPropagation()

                if (playerRef.current?.runInterval) {
                  restart()
                } else {
                  start()
                }
              }}
            >
              Start
            </MenuButton>
            {freeze ? (
              <MenuButton
                onClick={(e) => {
                  e.stopPropagation()
                  resume()
                }}
              >
                Resume
              </MenuButton>
            ) : null}
          </>
        </MenuGroup>
      )}
    </>
  )
}

export default SelectGame
