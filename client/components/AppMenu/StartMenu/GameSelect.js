import React, { useEffect, useRef, useState } from 'react'

import { usePlayer } from '../../../services/player'
import { readFileInput } from '../../../utils/file'
import FileInput from '../FileInput'
import { HiddenInput, MenuSelect } from '../AppMenu.css'

const GameSelect = ({ onChange }) => {
  const { initialized, playerRef, loadedGame, openROM } = usePlayer()
  const [ready, setReady] = useState(false)
  const [availableGames, setAvailableGames] = useState([])
  const [selectedGame, setSelectedGame] = useState('');
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

  useEffect(() => {
    if (selectedGame) {
      if (selectedGame === 'add') {
        hiddenInputRef.current.click()
      } else {
        playerRef.current.loadROM(selectedGame).then(openROM)
      }
    }
  }, [selectedGame])

  if (!ready) {
    return null
  }

  return (
    <>
      <FileInput
        ref={hiddenInputRef}
        accept=".gb,.gbc"
        label="Add ROM File"
        onChange={(file) => openROM(file).then(updateAvailableGames)}
      />
      {!!availableGames.length && (
        <MenuSelect
          value={loadedGame}
          onChange={(event) => {
            setSelectedGame(event.target.value || ``)
          }}
        >
          <option key="game-select">Select game</option>
          {availableGames.map((game) => (
            <option key={`game-${game}`} value={game}>
              {game}
            </option>
          ))}
          <option value="add">Add</option>
        </MenuSelect>
      )}
    </>
  )
}

export default GameSelect
