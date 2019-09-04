import React, { useCallback, useEffect, useState } from 'react'

import { useControls } from '../../../lib/controls'
import {
  ControlsContainer,
  ControlsInner,
  ControlOutline,
  Direction
} from './Controls.css'

const getDirection = (pressed) => {
  const dir = [0, 0]
  const labels = [
    ['up', 'down'],
    ['left', 'right'],
  ]
  
  if (pressed.includes('up')) {
    dir[0] = dir[0] + 1
  }
  
  if (pressed.includes('down')) {
    dir[0] = dir[0] - 1
  }
  
  if (pressed.includes('right')) {
    dir[1] = dir[1] + 1
  }
  
  if (pressed.includes('left')) {
    dir[1] = dir[1] - 1
  }
  
  const labelParts = []
  
  if (dir[0] === 1) {
    labelParts.push(labels[0][0])
  } else if (dir[0] === -1) {
    labelParts.push(labels[0][1])
  }
  
  if (dir[1] === -1) {
    labelParts.push(labels[1][0])
  } else if (dir[1] === 1) {
    labelParts.push(labels[1][1])
  }
  
  return labelParts.join('-')
}

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
  const [direction, setDirection] = useState(getDirection(pressed))
  const [dpadPressed, setDpadPressed] = useState(false)
  const [rotating, setRotating] = useState(false)
  
  useEffect(() => {
    const dir = getDirection(pressed)
    
    if (!!dir) {
      if (direction && dir !== direction) {
        setRotating(true)
      }
      
      setDirection(dir)
      setDpadPressed(true)
    } else {
      setDpadPressed(false)
      setRotating(false)
    }
  }, [pressed])

  return (
    <>
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
        {(group === 'dpad') && (
          <Direction
            direction={direction}
            rotating={rotating}
            visible={dpadPressed}
          />
        )}
      </ControlsContainer>
    </>
  )
}

export default Controls
