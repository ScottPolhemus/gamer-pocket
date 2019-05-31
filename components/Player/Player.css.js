import styled, { createGlobalStyle, css } from 'styled-components'

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
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`
