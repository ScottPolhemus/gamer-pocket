import { createGlobalStyle, css } from 'styled-components'

import { rgb } from '../styles/color'

export const BaseStyle = createGlobalStyle`
  body {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: 0;

    ${({ colorName }) => {
      const [r, g, b] = rgb(colorName)

      return css`
        background: rgb(${r}, ${g}, ${b});
      `
    }}
  }
`
