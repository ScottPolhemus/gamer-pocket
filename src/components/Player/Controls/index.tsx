import * as React from 'react'

import {
  useControls,
  Control,
  ControlSize,
  ControlPosition,
} from '../../../services/controls'
import { useSettings } from '../../../services/settings'
import {
  ControlsContainer,
  ControlsInner,
  ControlOutline,
} from './Controls.css'

const Controls = ({
  controls,
  group,
  size,
  position,
}: {
  controls: Control[]
  group: string
  size: ControlSize
  position: ControlPosition
}): JSX.Element => {
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
