import styled, { css } from 'styled-components'
import Typography from '@material-ui/core/Typography'

const screenVertical = `(min-width: 700px)`
const screen3x = `(min-width: 830px) and (min-height: 500px)`
const screen4x = `(min-width: 1024px) and (min-height: 768px)`

export const ScreenContainer = styled.div`
  position: relative;
  width: 100%;
  order: 0;

  @media ${screenVertical} {
    width: auto;
    order: 1;
  }
`

export const ScreenBorder = styled.div`
  position: relative;
  width: 320px;
  height: 288px;
  margin: auto;
  border: 8px solid black;
  border-bottom-width: 32px;
  border-radius: 8px;
  box-sizing: content-box;
  z-index: 1;

  @media ${screen3x} {
    width: 480px;
    height: 432px;
  }

  @media ${screen4x} {
    width: 640px;
    height: 576px;
  }

  ${(props) => props.paused && css`
    background: black;
    overflow: hidden;
  `}

  ${(props) => !props.playing && !props.paused && css`
    background: #303030;
  `}
`

export const ScreenContent = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 16px;
  z-index: 3;
`


export const ScreenOverlay = styled.span`
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  pointer-events: none;

  ${(props) => props.filter === 'lcd' && css`
    background-position: 0 0;
    background-size: 2px 2px;
    background-image: linear-gradient(rgba(0,0,0,0.125), rgba(0,0,0,0.125) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.125) 75%, rgba(0,0,0,0.125)), linear-gradient(90deg, rgba(0,0,0,0.125), rgba(0,0,0,0.125) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.125) 75%, rgba(0,0,0,0.125));

    @media ${screen3x} {
      background-size: 3px 3px;
    }

    @media ${screen4x} {
      background-size: 4px 4px;
    }
  `}
`

export const ScreenCanvas = styled.canvas`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-crisp-edges;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  pointer-events: none;
  opacity: 0;

  ${(props) => props.playing && css`
    opacity: 1;
  `}

  ${(props) => props.paused && css`
    filter: blur(16px);
    opacity: 0.5;
  `}
`

export const ScreenTitle = styled(Typography).attrs({
  variant: 'body2'
})`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color: white;
  text-align: center;
  line-height: 32px;
  font-style: italic;
  font-weight: bold;
  text-transform: uppercase;
  opacity: 0.5;
  z-index: 1;
`
