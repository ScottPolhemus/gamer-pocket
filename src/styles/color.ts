import { css, FlattenSimpleInterpolation } from 'styled-components'
import Color from 'color'
import colorValues, { RGB } from 'color-name'

import { ColorOption } from '../services/settings'

export type ValidColor =
  | ColorOption
  | 'black'
  | 'white'
  | 'lightgray'
  | 'orange'

export const rgb = (colorName: ValidColor): RGB => colorValues[colorName]

export const color = (colorName: ValidColor): Color => Color.rgb(rgb(colorName))

export const shadows = (colorName: ValidColor): {
  background: string,
  light: string,
  dark: string,
} => {
  const baseColor = color(colorName)

  return {
    background: baseColor.hsl().string(),
    light: baseColor.lighten(0.25).hsl().string(),
    dark: baseColor.darken(0.25).hsl().string(),
  }
}

export const buttonShadow = (colorName: ValidColor): FlattenSimpleInterpolation => {
  const baseColor = color(colorName)

  return css`
    background: linear-gradient(
      to top,
      ${baseColor.darken(0.25).hsl().string()} 25%,
      ${baseColor.hsl().string()}
    );
    box-shadow: 0 0.5rem 1rem ${baseColor.alpha(0.25).hsl().string()};
  `
}
