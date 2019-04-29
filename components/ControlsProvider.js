import React, { useCallback, useContext, useEffect, useRef, useState }  from 'react'
import { findDOMNode } from 'react-dom'
import SAT from 'sat'
import _ from 'lodash'

import { ControlsContext, controlsConfig, keyboardMap } from '../lib/controls'
import { PlayerContext } from '../lib/player'

const ControlsProvider = ({children}) => {
  const { gameboy } = useContext(PlayerContext)
  const groupRefs = controlsConfig.reduce((refs, g) => ({ ...refs, [g.group]: useRef() }), {})
  const [touches, setTouches] = useState([])
  const [keysDown, setKeysDown] = useState([])
  const [pressed, setPressed] = useState([])
  const [prevPressed, setPrevPressed] = useState([])
  
  useEffect(() => {
    const touchPressedControls = touches.reduce((arr, t) => {
      const tX = t.clientX
      const tY = t.clientY
      const tCircle = new SAT.Circle(new SAT.Vector(tX, tY), 25)

      for (let j = 0; j < controlsConfig.length; j++) {
        const g = controlsConfig[j]
        const gRef = groupRefs[g.group].current

        if (!gRef) { continue; }

        const gCanvas = findDOMNode(gRef).querySelector('canvas')
        const gControls = g.controls
        const gBB = gCanvas.getBoundingClientRect()
        const gX = gBB.x
        const gY = gBB.y

        for (let k = 0; k < gControls.length; k++) {
          const btn = gControls[k]
          const btnX = gX + (btn.pos.x / 2)
          const btnY = gY + (btn.pos.y / 2)
          const btnR = btn.pos.r / 2

          if (btn.type === `circle`) {
            const btnCircle = new SAT.Circle(new SAT.Vector(btnX, btnY), btnR)
            const isPressed = SAT.testCircleCircle(tCircle, btnCircle)
            if (isPressed) {
              arr.push(btn.name)
            }
          } else if (btn.type === `pill`) {
            const btnRect = new SAT.Box(new SAT.Vector(btnX, btnY), btn.pos.w / 2, btn.pos.h / 2).toPolygon()
            const isPressed = SAT.testPolygonCircle(btnRect, tCircle)
            if (isPressed) {
              arr.push(btn.name)
            }
          }
        }
      }

      return arr
    }, [])
    
    const keyPressedControls = keysDown.map((keyCode) => keyboardMap[keyCode])
    
    setPressed(_.uniq(touchPressedControls.concat(keyPressedControls)))
  }, [touches, keysDown])
  
  useEffect(() => {
    if (gameboy.current) {
      _.difference(pressed, prevPressed).forEach((button) => gameboy.current.buttonDown(button))
      _.difference(prevPressed, pressed).forEach((button) => gameboy.current.buttonUp(button)) 
    }

    setPrevPressed(pressed)
  }, [pressed])
  
  const onTouchStart = useCallback((event) => {
    if (!event.target.matches(`[data-screen], [data-screen] *, [role="listbox"], [role="listbox"] *`)) {
      event.preventDefault()
    }

    if (!event.changedTouches || !event.changedTouches.length) {
      return
    }

    setTouches((currentTouches) => {
      return [
        ...currentTouches,
        ...event.changedTouches
      ]
    })
  }, [])

  const onTouchMove = useCallback((event) => {
    setTouches((currentTouches) => {
      let newTouches = currentTouches.slice(0)

      for (let i = 0; i < event.changedTouches.length; i++) {
        const changedTouch = event.changedTouches[i]

        newTouches = newTouches.map((touch) => {
          if (touch.identifier === changedTouch.identifier) {
            return changedTouch
          }

          return touch
        })
      }
      
      return newTouches
    })
  }, [])

  const onTouchEnd = useCallback((event) => {
    const cancelledIds = _.map(event.changedTouches, (t) => t.identifier);
    
    setTouches((currentTouches) => {
      return currentTouches.filter((t) => !cancelledIds.includes(t.identifier))
    })
  }, [])

  const onKeyDown = useCallback((event) => {
    setKeysDown((currentKeysDown) => {
      if (currentKeysDown.includes(event.keyCode)) {
        return currentKeysDown
      }
      
      return _.uniq([...currentKeysDown, event.keyCode])
    })
  }, [])

  const onKeyUp = useCallback((event) => {
    setKeysDown((currentKeysDown) => {
      if (!currentKeysDown.includes(event.keyCode)) {
        return currentKeysDown
      }
      
      return currentKeysDown.filter((k => k !== event.keyCode))
    })
  }, [])

  const onResize = useCallback((event) => {
    setTouches([])
  }, [])
  
  const cancelGesture = useCallback((event) => event.preventDefault(), [])
  
  useEffect(() => {
    document.addEventListener('touchstart', onTouchStart, { passive: false })
    document.addEventListener('touchmove', onTouchMove)
    document.addEventListener('touchend', onTouchEnd)
    document.addEventListener('touchcancel', onTouchEnd)
    
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('resize', onResize)
    
    window.addEventListener('gesturestart', cancelGesture)
    window.addEventListener('gestureend', cancelGesture)
    
    return () => {
      document.removeEventListener('touchstart', onTouchStart)
      document.removeEventListener('touchmove', onTouchMove)
      document.removeEventListener('touchend', onTouchEnd)
      document.removeEventListener('touchcancel', onTouchEnd)
      
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('resize', onResize)
      
      window.removeEventListener('gesturestart', cancelGesture)
      window.removeEventListener('gestureend', cancelGesture)
    }
  }, [])
  
  return (
    <ControlsContext.Provider value={{pressed, groupRefs}}>
      {children}
    </ControlsContext.Provider>
  )
}

export default ControlsProvider