import React, { useEffect, useRef, useState } from 'react'

import { usePlayer } from '../../../services/player'
import { readFileInput } from '../../../utils/file'
import FileInput from '../FileInput'
import { HiddenInput, MenuSelect } from '../AppMenu.css'

const GameSelect = ({ onChange }) => {
  const { initialized, playerRef, loadedGame, openROM } = usePlayer()
  const [ready, setReady] = useState(false)
  const [availableGames, setAvailableGames] = useState([])
  const hiddenInputRef = useRef()

  const updateAvailableGames = () => {
    if (initialized) {
      playerRef.current.getStorageKeys().then((keys) => {
        const games = keys
          .filter((key) => key.indexOf('ROM_') === 0)
          .map((key) => key.slice('ROM_'.length))
        setAvailableGames(games)
        setReady(true)
      })
    }
  }

  useEffect(updateAvailableGames, [initialized])

  if (!ready) {
    return null
  }

  if (!availableGames.length) {
    return (
      <FileInput
        accept=".gb,.gbc"
        label="Add ROM File"
        onChange={(file) => openROM(file).then(updateAvailableGames)}
      />
    )
  }

  return (
    <>
      <MenuSelect
        value={loadedGame}
        onChange={(event) => {
          if (event.target.value === `add`) {
            hiddenInputRef.current.click()
          } else if (event.target.value) {
            playerRef.current.loadROM(event.target.value).then(openROM)
          }
        }}
      >
        <option key="game-select">Select game</option>
        {availableGames.map((game) => (
          <option key={`game-${game}`} value={game}>
            {game}
          </option>
        ))}
        <option key="game-add" value="add">
          Add ROM
        </option>
      </MenuSelect>
      <HiddenInput
        type="file"
        accept=".gb,.gbc"
        onChange={(event) => readFileInput(event.target).then(onChange)}
        ref={hiddenInputRef}
      />
    </>
  )
}

export default GameSelect
