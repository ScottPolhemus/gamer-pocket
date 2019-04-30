import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

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
  text-align: center;
`

const PausedTitle = styled(Typography)`
  margin-bottom: 8px;
`

const GamePaused = () => {
  const {loadSRAM, restart, stop} = useContext(PlayerContext)
  return (
    <PausedContainer>
      <PausedTitle>Paused - Tap screen to resume</PausedTitle>
      <Grid container spacing={16}>
        <Grid item xs={6}>
          <Button
            variant="contained"
            fullWidth
            onClick={(e) => {
              e.stopPropagation()
              restart()
            }}
          >Restart</Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            fullWidth
            onClick={(e) => {
              e.stopPropagation()
              stop()
            }}
          >Change ROM</Button>
        </Grid>
      </Grid>
      {/*<FileInput
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
      }}>Restart</button>*/}
    </PausedContainer>
  )
}

export default GamePaused