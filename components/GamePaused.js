import React, { useContext, useState } from 'react'
import styled from 'styled-components'

import { stringToArrayBuffer } from '../lib/file'
import { PlayerContext } from '../lib/player'
import FileInput from './FileInput'
import DownloadButton from './DownloadButton'
import MuteButton from './MuteButton'

const PausedContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
`

const GamePaused = () => {
  const {loadSRAM, restart} = useContext(PlayerContext)
  return (
    <PausedContainer>
      <p>Paused</p>
      <FileInput
        label="Import Save"
        accept=".sav"
        onChangeFile={(file) => {
          const save = stringToArrayBuffer(file)
          
          if (window.confirm(`Replace current save file?`)) {
            loadSRAM(save)
          }
        }}
      />
      <DownloadButton />
      <MuteButton />
      <button onClick={(e) => {
        e.stopPropagation()
        restart()
      }}>Restart</button>
    </PausedContainer>
  )
}

export default GamePaused