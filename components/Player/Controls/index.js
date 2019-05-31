import React, { useCallback } from 'react'

import { useControls } from '../../../lib/controls'
import {
  
ControlsContainer,
  ControlsInner,
  ControlOutline
} from './Controls.css'

const Controls = ({
  controls,
  group,
  size,
  position
}) => {
  const {
    groupRefs,
    pressed
  } = useControls()

  return (
    <ControlsContainer
      ref={groupRefs[group]}
      position={position}
    >
      <ControlsInner {...size}>
        {controls.map((control) => {
          return (
            <ControlOutline
              key={`control-outline-${control.name}`}
              size={size}
              pressed={pressed.includes(control.name)}
              {...control}
            />
          )
        })}
      </ControlsInner>
    </ControlsContainer>
  )
}

export default Controls
