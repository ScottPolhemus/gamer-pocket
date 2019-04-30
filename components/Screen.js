import React, { useContext, useEffect } from 'react'
import { findDOMNode } from 'react-dom'
import { useCookies } from 'react-cookie'
import styled, { css } from 'styled-components'
import _ from 'lodash'

import { PlayerContext } from '../lib/player'
import GamePaused from './GamePaused'

const ScreenWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
  align-self: center;
  order: 1;
  
  @media (max-width: 619px) {
    width: 100%;
    order: 0;
    margin: 0 auto;
  }
`

const ScreenInner = styled.div`
  display: flex;
  position: relative;
  width: 320px;
  height: 288px;
  margin: auto;
  color: white;
  z-index: 1;
  overflow: hidden;

  @media (min-width: 321px) {
    border-radius: 8px;
  }

  @media (min-width: 830px) and (min-height: 500px) {
    width: 480px;
    height: 432px;
  }
  
  @media (min-width: 1024px) and (min-height: 768px) {
    width: 640px;
    height: 576px;
  }

  ${(props) => (!props.playing || props.paused) && css`
    background: #303030;
  `}
`

const ScreenContent = styled.div`
  display: flex;
  flex: 1;
  padding: 1rem;
  flex-direction: column;
`

const ScreenCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  image-rendering: optimizeSpeed;
  image-rendering: -moz-crisp-edges;
  image-rendering: -o-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: optimize-contrast;
  image-rendering: crisp-edges;
  image-rendering: pixelated;
  -ms-interpolation-mode: nearest-neighbor;
  pointer-events: none;
  z-index: -1;
  border-radius: inherit;
  opacity: 0;

  ${(props) => props.playing && css`
    opacity: 1;
  `}

  ${(props) => props.paused && css`
    filter: blur(16px);
    opacity: 0.5;
  `}
`

const Screen = ({
  children
}) => {
  const [{color = 'rebeccapurple'}] = useCookies()
  const {
    screenCanvasRef,
    freezeScreen,
    playing,
    paused,
    pause,
    run,
    resume
  } = useContext(PlayerContext)
  
  let onClick
  
  if (playing) {
    if (!paused) {
      onClick = pause
    } else {
      onClick = run
    }
  } else if (paused) {
    onClick = resume
  }
  
  useEffect(() => {
    if (freezeScreen && paused && !playing && screenCanvasRef.current) {
      findDOMNode(screenCanvasRef.current).getContext('2d').putImageData(freezeScreen, 0, 0)
    }
  }, [playing, paused, freezeScreen])
  
  return (
    <ScreenWrapper>
      <ScreenInner
        data-screen
        paused={paused}
        playing={playing}
        onClick={onClick}
      >
        {paused ? (
          <ScreenContent>
            <GamePaused />
          </ScreenContent>
        ) : (
          !playing && (
            <ScreenContent>{children}</ScreenContent>
          )
        )}
        <ScreenCanvas
          data-screen
          paused={paused}
          playing={playing}
          ref={screenCanvasRef}
          width="160"
          height="144"
        />
      </ScreenInner>
    </ScreenWrapper>
  )
}

export default Screen