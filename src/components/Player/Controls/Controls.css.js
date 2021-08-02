import styled, { css } from 'styled-components'

import { screenVertical3x } from '../../../styles/mq'
import { shadows } from '../../../styles/color'

export const ControlsContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.position === 'left' &&
    css`
      order: 1;

      @media ${screenVertical3x} {
        margin-left: 48px;
      }
    `}

  ${(props) =>
    props.position === 'right' &&
    css`
      order: 2;

      @media ${screenVertical3x} {
        margin-right: 48px;
      }
    `}

  ${(props) =>
    props.position === 'bottom' &&
    css`
      order: 3;
      align-self: center;
      margin: 0 auto;
      width: 100%;
    `}

  @media (min-width: 636px) {
    ${(props) =>
      props.position === 'left' &&
      css`
        order: 0;
      `}

    ${(props) =>
      props.position === 'bottom' &&
      css`
        align-self: bottom;
      `}
  }
`

export const ControlsInner = styled.div`
  position: relative;
  display: block;

  ${(props) => css`
    width: ${props.width / 2}px;
    height: ${props.height / 2}px;
  `}
`

export const ControlOutline = styled.span`
  position: absolute;
  display: block;
  z-index: -1;
  background: linear-gradient(
    -30deg,
    hsla(0, 0%, 0%, 0.5) 25%,
    hsla(0, 0%, 0%, 0)
  );
  overflow: hidden;
  transition: 75ms;

  ${({ colorName, pressed }) => {
    const colors = shadows(colorName)

    return css`
      box-shadow: 4px 4px 12px 2px ${colors.dark},
        -4px -4px 12px 2px ${colors.light};

      ${pressed &&
      css`
        box-shadow: 4px 4px 12px 2px ${colors.light},
          -4px -4px 12px 2px ${colors.dark}, inset 0 0 8px hsla(0, 0%, 0%, 0.5);
      `}
    `
  }}

  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
  }

  ${(props) =>
    props.type === 'circle' &&
    css`
      top: ${100 * ((props.pos.y - props.pos.r) / props.size.height)}%;
      left: ${100 * ((props.pos.x - props.pos.r) / props.size.width)}%;
      width: ${100 * (props.pos.r / (props.size.width / 2))}%;
      height: ${100 * (props.pos.r / (props.size.height / 2))}%;
      border-radius: 100%;
    `}

  ${(props) =>
    props.type === 'pill' &&
    css`
      top: ${100 * (props.pos.y / props.size.height)}%;
      left: ${100 * (props.pos.x / props.size.width)}%;
      width: ${100 * (props.pos.w / props.size.width)}%;
      height: ${100 * (props.pos.h / props.size.height)}%;
      border-radius: ${props.pos.h / 2}px;
    `}
`
