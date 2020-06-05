import React from 'react'

import { useControls } from '../../../services/controls'
import { useSettings } from '../../../services/settings'
import {
  ControlsContainer,
  ControlsInner,
  ControlOutline,
} from './Controls.css'

const Controls = ({ controls, group, size, position }) => {
  const { groupRefs, pressed } = useControls()
  const { color } = useSettings()

  return (
    <ControlsContainer ref={groupRefs[group]} position={position}>
      <ControlsInner {...size}>
        {controls.map((control) => (
          <ControlOutline
            colorName={color}
            key={`control-outline-${control.name}`}
            size={size}
            pressed={pressed.includes(control.name)}
            {...control}
          />
        ))}
      </ControlsInner>
    </ControlsContainer>
  )
}

export default Controls
