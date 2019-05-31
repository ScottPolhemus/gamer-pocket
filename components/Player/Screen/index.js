import React, { useEffect, useRef } from 'react'
import { findDOMNode } from 'react-dom'
import styled from 'styled-components'

import { usePlayer } from '../../../lib/player'
import { useSettings } from '../../../lib/settings'
import {
  ScreenContainer,
  ScreenBorder,
  ScreenContent,
  ScreenCanvas,
  ScreenOverlay,
  ScreenTitle
} from './Screen.css'

const Screen = ({
  children
}) => {
  const {
    screenCanvasRef,
    freezeScreen,
    playing,
    paused,
    pause,
    unPause,
    resume
  } = usePlayer()
  const { screenFilter } = useSettings()
  const screenContentRef = useRef()

  // Draw freezeScreen to canvas when present
  useEffect(() => {
    if (freezeScreen && paused && !playing && screenCanvasRef.current) {
      findDOMNode(screenCanvasRef.current).getContext('2d').putImageData(freezeScreen, 0, 0)
    }
  }, [playing, paused, freezeScreen])

  let onClick

  if (playing) {
    if (!paused) {
      onClick = pause
    } else {
      onClick = unPause
    }
  } else if (paused) {
    onClick = resume
  }

  return (
    <ScreenContainer>
      <ScreenBorder
        data-screen
        onClick={onClick}
        paused={paused}
        playing={playing}
      >
        {(!playing || paused) && (
          <ScreenContent>
            {children}
          </ScreenContent>
        )}
        <ScreenOverlay filter={screenFilter} playing={playing} paused={paused} />
        <ScreenCanvas
          ref={screenCanvasRef}
          width="160"
          height="144"
          paused={paused}
          playing={playing}
        />
      </ScreenBorder>
      <ScreenTitle>Gamer Pocket</ScreenTitle>
    </ScreenContainer>
  )
}

export default Screen
