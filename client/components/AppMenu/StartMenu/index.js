import React, { useEffect, useState } from 'react'

import { usePlayer } from '../../../services/player'
import { useSettings } from '../../../services/settings'
import { MenuButton, MenuGroup } from '../AppMenu.css'
import FileInput from '../FileInput'
import GameSelect from './GameSelect'

const SelectGame = () => {
  const {
    playerRef,
    initialized,
    loadedGame,
    freeze,
    openROM,
    start,
    restart,
    resume,
  } = usePlayer()
  const { setMenu } = useSettings()

  return (
    <>
      <MenuGroup>
        <GameSelect />
      </MenuGroup>
      {!!(initialized && loadedGame) && (
        <MenuGroup horizontal>
          <MenuButton
            onClick={(e) => {
              e.stopPropagation()

              if (playerRef.current.runInterval) {
                restart()
              } else {
                start()
              }
            }}
          >
            Start
          </MenuButton>
          {!!freeze && (
            <MenuButton
              onClick={(e) => {
                e.stopPropagation()
                resume()
              }}
            >
              Resume
            </MenuButton>
          )}
        </MenuGroup>
      )}
    </>
  )

  // return (
  //   <div>
  //     <MenuGroup horizontal>
  //       {!!(initialized && loadedGame) && (
  //         <MenuButton
  //           onClick={(e) => {
  //             e.stopPropagation()

  //             if (playerRef.current.runInterval) {
  //               restart()
  //             } else {
  //               start()
  //             }
  //           }}
  //         >
  //           Start
  //         </MenuButton>
  //       )}
  //       {!!(initialized && loadedGame && freeze) && (
  //         <MenuButton
  //           onClick={(e) => {
  //             e.stopPropagation()
  //             resume()
  //           }}
  //         >
  //           Resume
  //         </MenuButton>
  //       )}
  //     </MenuGroup>
  //     <MenuButton
  //       onClick={(e) => {
  //         e.stopPropagation()
  //         setMenu('settings')
  //       }}
  //     >
  //       Settings
  //     </MenuButton>
  //   </div>
  // )
}

export default SelectGame
