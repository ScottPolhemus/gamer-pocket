import React, { useEffect } from 'react'

import { usePlayer } from '../../../services/player'
import { useSettings } from '../../../services/settings'
import {
  ScreenContainer,
  ScreenBorder,
  ScreenContent,
  ScreenCanvas,
  ScreenOverlay,
  ScreenTitle,
} from './Screen.css'

const Screen = ({ children }: { children: JSX.Element }): JSX.Element => {
  const {
    screenCanvasRef,
    freezeScreen,
    currentGame,
    playing,
    paused,
    pause,
    unPause,
    resume,
  } = usePlayer()
  const { color, screenFilter } = useSettings()

  // Draw freezeScreen to canvas when present
  useEffect(() => {
    if (freezeScreen && paused && !playing && screenCanvasRef.current) {
      screenCanvasRef.current.getContext('2d')?.putImageData(freezeScreen, 0, 0)
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
        colorName={color}
        onClick={onClick}
        paused={paused}
        playing={playing}
      >
        {(!playing || paused) && <ScreenContent>{children}</ScreenContent>}
        <ScreenOverlay
          filter={screenFilter}
          playing={playing || (!!currentGame && !!freezeScreen)}
          paused={paused}
        />
        <ScreenCanvas
          ref={screenCanvasRef as React.RefObject<HTMLCanvasElement>}
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
