import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { findDOMNode } from 'react-dom'
import _ from 'lodash'
import SAT from 'sat'

import { usePlayer } from './player'

// Sizing constants
const lgR = 75;
const smR = 50;
const pillW = 100;
const pillH = 30;
const pillR = pillH / 2;
const pillMargin = 30;

export const ControlsContext = createContext()

// Provider component for generating controls context and handling effects
export const ControlsProvider = ({
  children
}) => {
  const { playerRef } = usePlayer()
  const groupRefs = controlsConfig.reduce((refs, g) => ({ ...refs, [g.group]: useRef() }), {})
  const [touches, setTouches] = useState([])
  const [keysDown, setKeysDown] = useState([])
  const [pressed, setPressed] = useState([])

  // Update pressed controls based on current touches and keys down
  useEffect(() => {
    const touchPressedControls = touches.reduce((arr, t) => {
      const tX = t.clientX
      const tY = t.clientY
      const tCircle = new SAT.Circle(new SAT.Vector(tX, tY), 25)

      for (let j = 0; j < controlsConfig.length; j++) {
        const g = controlsConfig[j]
        const gRef = groupRefs[g.group].current

        if (!gRef) { continue; }

        // TODO: Update to use bounding boxes of ControlOutline elements
        const gInner = findDOMNode(gRef).firstElementChild
        const gControls = g.controls
        const gBB = gInner.getBoundingClientRect()
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

    const nextPressed = _.uniq(touchPressedControls.concat(keyPressedControls))

    // Call player APIs to press/unpress buttons on changes
    if (playerRef.current && !_.isEqual(nextPressed, pressed)) {
      _.difference(nextPressed, pressed).forEach((button) => playerRef.current.buttonDown(button))
      _.difference(pressed, nextPressed).forEach((button) => playerRef.current.buttonUp(button))
    }

    setPressed(nextPressed)
  }, [touches, keysDown])

  // Handle touch start events
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

  // Handle touch move events
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

  // Handle touch end/cancel events
  const onTouchEnd = useCallback((event) => {
    const cancelledIds = _.map(event.changedTouches, (t) => t.identifier);

    setTouches((currentTouches) => {
      return currentTouches.filter((t) => !cancelledIds.includes(t.identifier))
    })
  }, [])

  // Handle key down events
  const onKeyDown = useCallback((event) => {
    setKeysDown((currentKeysDown) => (
      currentKeysDown.includes(event.keyCode) ? (
        currentKeysDown
      ) : (
        _.uniq([...currentKeysDown, event.keyCode])
      )
    ))
  }, [])

  // Handle key up events
  const onKeyUp = useCallback((event) => {
    setKeysDown((currentKeysDown) => (
      !currentKeysDown.includes(event.keyCode) ? (
        currentKeysDown
      ) : (
        _.filter(currentKeysDown, (k => k !== event.keyCode))
      )
    ))
  }, [])

  // Handle resize events
  const onResize = useCallback(() => setTouches([]), [])

  // Handle gesture start/end events
  const cancelGesture = useCallback((event) => event.preventDefault(), [])

  // Bind event listeners to document and window
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
    <ControlsContext.Provider
      value={{
        groupRefs,
        pressed
      }}
    >
      {children}
    </ControlsContext.Provider>
  )
}

// Hook for providing controller context to components
export const useControls = () => {
  const {
    groupRefs,
    pressed
  } = useContext(ControlsContext)

  return {
    groupRefs,
    pressed
  }
}

// Control group configurations
export const controlsConfig = [
  {
    group: `actions`,
    position: `right`,
    size: {
      width: smR * 2 * 3,
      height: smR * 2 * 3
    },
    controls: [
      {
        name: `a`,
        type: `circle`,
        pos: {
          x: (smR * 2 * 3) - lgR,
          y: lgR * 1.5,
          r: lgR
        }
      },
      {
        name: `b`,
        type: `circle`,
        pos: {
          x: lgR,
          y: (smR * 2 * 3) - lgR,
          r: lgR
        }
      }
    ]
  },
  {
    group: `options`,
    position: `bottom`,
    size: {
      width: (pillW * 2) + pillMargin,
      height: pillH
    },
    controls: [
      {
        name: `start`,
        type: `pill`,
        pos: {
          x: pillW + pillMargin,
          y: 0,
          w: pillW,
          h: pillH
        }
      },
      {
        name: `select`,
        type: `pill`,
        pos: {
          x: 0,
          y: 0,
          w: pillW,
          h: pillH
        }
      }
    ]
  },
  {
    group: `dpad`,
    position: `left`,
    size: {
      width: smR * 2 * 3,
      height: smR * 2 * 3
    },
    controls: [
      {
        name: `up`,
        type: `circle`,
        pos: {
          x: (smR * 2 * 3) / 2,
          y: smR,
          r: smR
        }
      },
      {
        name: `down`,
        type: `circle`,
        pos: {
          x: (smR * 2 * 3) / 2,
          y: (smR * 2 * 3) - smR,
          r: smR
        }
      },
      {
        name: `left`,
        type: `circle`,
        pos: {
          x: smR,
          y: (smR * 2 * 3) / 2,
          r: smR
        }
      },
      {
        name: `right`,
        type: `circle`,
        pos: {
          x: (smR * 2 * 3) - smR,
          y: (smR * 2 * 3) / 2,
          r: smR
        }
      }
    ]
  }
]

export const drawControls = ({
  canvas,
  controls,
  size,
  pressed
}) => {
  const ctx = canvas.getContext('2d')

  canvas.width = size.width
  canvas.height = size.height

  for (let i = 0; i < controls.length; i++) {
    const c = controls[i]

    if (!c.pos) { continue; }

    ctx.fillStyle = pressed.includes(c.name) ? 'white' : 'black'

    if (c.type === `circle`) {
      ctx.beginPath()
      ctx.arc(c.pos.x, c.pos.y, c.pos.r, 0, 2 * Math.PI, false)
      ctx.fill()
    } else if (c.type === `pill`) {
      ctx.fillRect(c.pos.x + (c.pos.h / 2), c.pos.y, c.pos.w - c.pos.h, c.pos.h)
      ctx.beginPath()
      ctx.arc(c.pos.x + (c.pos.h / 2), c.pos.y + (c.pos.h / 2), c.pos.h / 2, 0, 2 * Math.PI, false)
      ctx.arc(c.pos.x + c.pos.w - (c.pos.h / 2), c.pos.y + (c.pos.h / 2), c.pos.h / 2, 0, 2 * Math.PI, false)
      ctx.fill()
    }
  }
}

// Keyboard key to emulator key map
export const keyboardMap = {
  13: "start",
  16: "select",
  38: "up",
  87: "up",
  39: "right",
  68: "right",
  40: "down",
  83: "down",
  37: "left",
  65: "left",
  32: "a",
  18: "a",
  76: "a",
  88: "a",
  186: "b",
  222: "a",
  17: "b",
  90: "b",
  91: "b",
  93: "b",
  75: "b",
  //49: "save",
  //48: "load",
  //80: "speed"
}
