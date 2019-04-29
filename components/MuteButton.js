import React, { useCallback, useContext, useEffect, useRef, useState }  from 'react'

import { PlayerContext } from '../lib/player'

const MuteButton = () => {
  const { mute, unMute, muted } = useContext(PlayerContext)

  const buttonLabel = muted ? `Un-mute` : `Mute`
  const onClick = (event) => {
    event.stopPropagation()

    muted ? unMute() : mute()
  }

  return (
    <button onClick={onClick}>{buttonLabel}</button>
  )
}

export default MuteButton