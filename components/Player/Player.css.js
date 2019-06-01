import styled, { createGlobalStyle, css } from 'styled-components'

import {
  screenHorizontal,
  screen3x,
  screen4x,
  screenVertical3x,
} from '../../css/mq'

export const BaseStyle = createGlobalStyle`
  ${(props) => props.color && css`
    html, body {
      background: ${props.color};
    }

    body {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  `}
`

export const PlayerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: space-evenly;
  justify-content: space-around;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  @media ${screenVertical3x} {
    justify-content: space-between;
  }
`
