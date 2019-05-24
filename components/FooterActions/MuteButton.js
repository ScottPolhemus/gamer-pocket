import React from 'react'
import styled from 'styled-components'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import VolumeOffIcon from '@material-ui/icons/VolumeOff'

import { usePlayer } from '../../lib/player'

const MuteButtonContainer = styled.div`
  flex: 1;
  text-align: right;
`

const MuteButton = () => {
  const { mute, unMute, muted } = usePlayer()

  const label = muted ? `Un-mute` : `Mute`
  const onClick = (event) => {
    event.stopPropagation()
    muted ? unMute() : mute()
  }

  return (
    <MuteButtonContainer>
      <Tooltip
        aria-label="Mute"
        title="Mute"
        placement="top"
      >
        <Fab onClick={onClick}>
          {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
        </Fab>
      </Tooltip>
    </MuteButtonContainer>
  )
}

export default MuteButton
