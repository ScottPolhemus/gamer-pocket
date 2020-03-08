import styled, { css } from 'styled-components'

import {
  screenHorizontal,
  screen3x,
  screen4x,
  screenVertical3x,
} from '../../../css/mq'

export const ControlsContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) => props.position === 'left' && css`
    order: 1;

    @media ${screenVertical3x} {
      margin-left: 48px;
    }
  `}

  ${(props) => props.position === 'right' && css`
    order: 2;

    @media ${screenVertical3x} {
      margin-right: 48px;
    }
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
  overflow: hidden;
  border: 1px solid hsla(0,0%,10%,1);
  /*box-shadow: -5px -5px 5px white, 5px 5px 5px black;*/
  

  &:before {
    content: '';
    position: absolute;
    top: 0; bottom: 0; left: 0; right: 0;
    background: linear-gradient(45deg, black, hsla(0,0%,25%,1));
  }

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
    /*transition: none;*/
  `}
`

const angle = (direction) => {
  switch (direction) {
    case 'up':
      return 0;
    case 'up-right':
      return 45;
    case 'right':
      return 90;
    case 'down-right':
      return 135;
    case 'down':
      return 180;
    case 'down-left':
      return 225
    case 'left':
      return 270
    case 'up-left':
      return 315
  }
}

export const Direction = styled.span`
  position: absolute;
  bottom: 100%;
  margin-bottom: 16px;
  border-right: 8px solid transparent;
  border-left: 8px solid transparent;
  border-top: 0px solid transparent;
  border-bottom: 8px solid black;
  transform-origin: 8px 8px;
  pointer-events: none;
  opacity: 0;
  /*transition: opacity 150ms;*/

  ${(props) => props.rotating && css`
    /*transition: 150ms;*/
  `}

  &::before {
    content: ' ';
    display: block;
    position: absolute;
    width: 8px;
    height: 6px;
    background: black;
    top: 8px;
    left: -4px;
    right: 0;
  }

  ${(props) => props.direction && css`
    transform: rotate(${angle(props.direction)}deg);
  `}

  ${(props) => props.visible && css`
    /*opacity: 1;*/
  `}
`
