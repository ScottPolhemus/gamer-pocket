import styled, { css } from 'styled-components'

import { ColorOption, ScreenFilterOption } from '../../../services/settings'
import {
  screenHorizontal,
  screen3x,
  screen4x,
  screenVertical3x,
} from '../../../styles/mq'
import { shadows } from '../../../styles/color'

const lcdColor = 'rgba(0,0,0,0.1125)'

export const ScreenContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  order: 0;

  @media ${screenHorizontal} {
    width: auto;
    order: 1;
  }

  @media ${screenVertical3x} {
    width: 100%;
    order: 0;
  }
`

export const ScreenBorder = styled.div<{
  colorName: ColorOption
  playing: boolean
  paused: boolean
}>`
  position: relative;
  width: 320px;
  height: 288px;
  border: 8px solid hsla(0, 0%, 0%, 0);
  border-bottom-width: 32px;
  border-radius: 8px;
  box-sizing: content-box;
  z-index: 1;

  ${({ colorName }) => {
    const colors = shadows(colorName)

    return css`
      background: ${colors.background};
      box-shadow: 4px 4px 12px 2px ${colors.dark},
        -4px -4px 12px 2px ${colors.light};
    `
  }}

  @media (max-width: 336px) {
    margin-left: -8px;
    margin-right: -8px;
  }

  @media ${screen3x}, ${screenVertical3x} {
    width: 480px;
    height: 432px;
  }

  @media ${screen4x} {
    width: 640px;
    height: 576px;
  }

  ${(props) =>
    (props.playing || props.paused) &&
    css`
      ${'' /* background: black; */}
      overflow: hidden;
    `}

  ${(props) =>
    !props.playing &&
    !props.paused &&
    css`
      ${'' /* background: #303030; */}
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
  background: hsla(0, 0%, 0%, 0);
`

export const ScreenOverlay = styled.span<{
  filter: ScreenFilterOption
  playing: boolean
  paused: boolean
}>`
  display: none;
  position: absolute;
  top: -1px;
  bottom: -1px;
  left: -1px;
  right: -1px;
  z-index: 2;
  pointer-events: none;
  transform: translate3d(0, 0, 0);

  ${(props) =>
    props.playing &&
    css`
      display: block;
    `}

  ${(props) =>
    props.filter === 'lcd' &&
    css`
      background-position: 1px 1px;
      background-size: 2px 2px;
      background-image: linear-gradient(
          ${lcdColor},
          ${lcdColor} 25%,
          transparent 25%,
          transparent 75%,
          ${lcdColor} 75%,
          ${lcdColor}
        ),
        linear-gradient(
          90deg,
          ${lcdColor},
          ${lcdColor} 25%,
          transparent 25%,
          transparent 75%,
          ${lcdColor} 75%,
          ${lcdColor}
        );

      @media ${screen3x}, ${screenVertical3x} {
        background-size: 3px 3px;
      }

      @media ${screen4x} {
        background-size: 4px 4px;
      }

      @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
        top: -2px;
        right: -100%;
        left: -2px;
        bottom: -100%;
        margin-top: 1px;
        margin-left: 1px;
        transform: scale(0.5);
        transform-origin: 1px 1px;
        background-size: 4px 4px;

        @media ${screen3x} {
          background-size: 6px 6px;
        }

        @media ${screen4x} {
          background-size: 8px 8px;
        }
      }
    `}
`

export const ScreenCanvas = styled.canvas<{
  ref: React.RefObject<HTMLCanvasElement | null>
  playing: boolean
  paused: boolean
}>`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  /* stylelint-disable value-no-vendor-prefix */
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-crisp-edges;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  /* stylelint-enable */
  pointer-events: none;
  opacity: 0;

  ${(props) =>
    props.playing &&
    css`
      opacity: 1;
    `}

  ${(props) =>
    props.paused &&
    css`
      opacity: 0.1;
    `}
`

export const ScreenTitle = styled.h1`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  color: black;
  text-align: center;
  line-height: 32px;
  font-size: 1rem;
  font-style: italic;
  font-family: sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  opacity: 0.5;
  z-index: 1;
`
