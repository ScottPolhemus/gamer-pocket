import { css } from 'styled-components'
import Color from 'color'
import colorValues from 'color-name'

export const rgb = (colorName) => colorValues[colorName]

export const color = (colorName) => new Color.rgb(rgb(colorName))

export const shadows = (colorName) => {
  const baseColor = color(colorName)

  return {
    background: baseColor.hsl().string(),
    light: baseColor.lighten(0.25).hsl().string(),
    dark: baseColor.darken(0.25).hsl().string(),
  }
}

export const buttonShadow = (colorValue) => {
  const baseColor = color(colorValue)

  return css`
    background: linear-gradient(
      to top,
      ${baseColor.darken(0.25).hsl().string()} 25%,
      ${baseColor.hsl().string()}
    );
    box-shadow: 0 0.5rem 1rem ${baseColor.alpha(0.25).hsl().string()};
  `
}
