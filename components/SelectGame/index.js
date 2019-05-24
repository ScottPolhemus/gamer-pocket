import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

import { readFileInput } from '../../lib/file';
import { usePlayer } from '../../lib/player'
import FileInput from '../FileInput'

const GameField = styled(TextField).attrs({
  select: true,
  fullWidth: true,
  color: 'primary',
  variant: 'filled'
})`
`

const StartButton = styled(Button).attrs({
  color: 'primary',
  variant: 'contained',
  fullWidth: true
})`
  margin-top: 16px;
`

const SelectGame = () => {
  const {
    playerRef,
    initialized,
    loadedGame,
    freeze,
    openROM,
    start,
    restart,
    resume
  } = usePlayer()
  const hiddenFileInputRef = useRef()
  const [ready, setReady] = useState(false)
  const [availableGames, setAvailableGames] = useState([])

  const updateAvailableGames = () => {
    if (initialized) {
      playerRef.current.getStorageKeys()
        .then((keys) => {
          const games = keys
            .filter((key) => key.indexOf('ROM_') === 0)
            .map((key) => key.slice('ROM_'.length))
          setAvailableGames(games)
          setReady(true)
        })
    }
  }

  useEffect(updateAvailableGames, [initialized])

  return (
    <div onClick={(e) => e.stopPropagation()}>
      {!!(ready && availableGames.length) && (
        <>
          <GameField
            label="Select game"
            value={loadedGame}
            onChange={(event) => {
              if (event.target.value === `add`) {
                hiddenFileInputRef.current.click()
              } else {
                playerRef.current.loadROM(event.target.value)
                  .then(openROM)
              }
            }}
          >
            {availableGames.map((game) => (
              <MenuItem key={`game-${game}`} value={game}>{game}</MenuItem>
            ))}
            <MenuItem key={`game-add`} value="add">Add ROM</MenuItem>
          </GameField>
          <input
            type="file"
            accept=".gb,.gbc"
            onChange={(event) => readFileInput(event.target).then(openROM).then(updateAvailableGames)}
            ref={hiddenFileInputRef}
            style={{display: 'none'}}
          />
        </>
      )}
      {!!(ready && !availableGames.length) && (
        <FileInput
          accept=".gb,.gbc"
          label="Add ROM File"
          onChange={(file) => openROM(file).then(updateAvailableGames)}
        />
      )}
      {!!(initialized && loadedGame) && (
        <StartButton
          onClick={(event) => {
            event.stopPropagation()

            if (playerRef.current.runInterval) {
              restart()
            } else {
              start()
            }
          }}
        >Start {loadedGame}</StartButton>
      )}
      {!!(initialized && loadedGame && freeze) && (
        <StartButton
          onClick={(event) => {
            event.stopPropagation()
            resume()
          }}
        >Resume {loadedGame}</StartButton>
      )}
    </div>
  )
}

export default SelectGame
