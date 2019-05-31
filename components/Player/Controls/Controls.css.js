import styled, { css } from 'styled-components'

export const ControlsContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) => props.position === 'left' && css`
    order: 1;
  `}

  ${(props) => props.position === 'right' && css`
    order: 2;
  `}

  ${(props) => props.position === 'bottom' && css`
    order: 3;
    align-self: center;
    margin: 0 auto;
    width: 100%;
  `}

  @media (min-width: 636px) {
    ${(props) => props.position === 'left' && css`
      order: 0;
    `}

    ${(props) => props.position === 'bottom' && css`
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
  background: black;
  transition: 100ms;

  ${(props) => props.type === 'circle' && css`
    top: ${100 * ((props.pos.y - props.pos.r) / props.size.height)}%;
    left: ${100 * ((props.pos.x - props.pos.r) / props.size.width)}%;
    width: ${100 * (props.pos.r / (props.size.width / 2))}%;
    height: ${100 * (props.pos.r / (props.size.height / 2))}%;
    border-radius: 100%;
  `}

  ${(props) => props.type === 'pill' && css`
    top: ${100 * (props.pos.y / props.size.height)}%;
    left: ${100 * (props.pos.x / props.size.width)}%;
    width: ${100 * (props.pos.w / props.size.width)}%;
    height: ${100 * (props.pos.h / props.size.height)}%;
    border-radius: ${props.pos.h / 2}px;
  `}

  ${(props) => props.pressed && css`
    background: white;
    transition: 25ms;
  `}
`
