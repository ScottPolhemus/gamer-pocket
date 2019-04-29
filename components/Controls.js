import React, { useCallback, useContext } from 'react'
import styled, { css } from 'styled-components'

import { ControlsContext, drawControls } from '../lib/controls'

import Canvas from './Canvas'

export const ControlsContainer = styled.div`
  flex-shrink: 0;

  ${(props) => props.position === 'left' && css`
    order: 0;
  `}

  ${(props) => props.position === 'right' && css`
    order: 2;
  `}

  ${(props) => props.position === 'bottom' && css`
    order: 3;
    align-self: start;
    margin: 0 auto;
    width: 100%;
  `}

  @media (max-width: 619px) {
    ${(props) => props.position === 'left' && css`
      order: 1;
    `}

    ${(props) => props.position === 'bottom' && css`
      align-self: center;
    `}
  }
`

export const ControlsCanvas = styled(Canvas)`
  display: block;
  margin: auto;

  ${(props) => css`
    width: ${props.width / 2}px;
    height: ${props.height / 2}px;
  `}
`

const ControlsGroup = ({
  controls,
  group,
  position,
  size
}) => {
  const { groupRefs, pressed } = useContext(ControlsContext)
  const draw = useCallback((canvas) => drawControls({canvas, controls, pressed, size}), [pressed])
  
  return (
    <ControlsContainer
      position={position}
      ref={groupRefs[group]}
    >
      <ControlsCanvas
        draw={draw}
        height={size.height}
        width={size.width}
      ></ControlsCanvas>
    </ControlsContainer>
  )
}

export default ControlsGroup