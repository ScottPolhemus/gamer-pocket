import * as React from 'react'
import _ from 'lodash'
import SAT from 'sat'

import { usePlayer } from './player'

export enum ColorOption {
  Purple = 'rebeccapurple',
  Pink = 'deeppink',
  Red = 'crimson',
  Yellow = 'gold',
  Lime = 'limegreen',
  Green = 'seagreen',
  Teal = 'teal',
  Ice = 'deepskyblue',
  Blue = 'mediumblue',
  Silver = 'lightsteelblue',
  Black = 'black',
}

export enum ScreenFilterOption {
  None = 'none',
  LCD = 'lcd',
}

export enum MenuOption {
  Player = '',
}

interface ControlsContextValue {
  groupRefs: {
    [groupId: string]: React.MutableRefObject<HTMLDivElement | null>
  }
  pressed: string[]
}

export const ControlsContext = React.createContext<ControlsContextValue | null>(
  null
)

// Provider component for generating controls context and handling effects
export const ControlsProvider = ({ children }: { children: JSX.Element }) => {
  const { playerRef } = usePlayer()

  const groupRefs = controlsConfig.reduce(
    (refs, g) => ({
      ...refs,
      [g.group]: React.useRef<HTMLDivElement | null>(null),
    }),
    {}
  ) as ControlsContextValue['groupRefs']
  const [touches, setTouches] = React.useState([] as Touch[])
  const [keysDown, setKeysDown] = React.useState([] as KeyboardEvent['code'][])
  const [pressed, setPressed] = React.useState([] as string[])

  // Update pressed controls based on current touches and keys down
  React.useEffect(() => {
    const touchPressedControls = touches.reduce((arr, t) => {
      const tX = t.clientX
      const tY = t.clientY
      const tCircle = new SAT.Circle(new SAT.Vector(tX, tY), 25)

      for (let j = 0; j < controlsConfig.length; j++) {
        const g = controlsConfig[j]
        const gRef = groupRefs[g.group].current

        if (!gRef) {
          continue
        }

        // TODO: Update to use bounding boxes of ControlOutline elements
        const gInner = gRef.firstElementChild
        if (!gInner) {
          throw new Error('Control group missing children')
        }

        const gControls = g.controls
        const gBB = gInner.getBoundingClientRect()
        const gX = gBB.x
        const gY = gBB.y

        for (let k = 0; k < gControls.length; k++) {
          const btn = gControls[k]
          const btnX = gX + btn.pos.x / 2
          const btnY = gY + btn.pos.y / 2

          if (btn.type === ControlType.Circle) {
            const btnR = btn.pos.r / 2

            const btnCircle = new SAT.Circle(new SAT.Vector(btnX, btnY), btnR)
            const isPressed = SAT.testCircleCircle(tCircle, btnCircle)
            if (isPressed) {
              arr.push(btn.name)
            }
          } else if (btn.type === ControlType.Pill) {
            const btnRect = new SAT.Box(
              new SAT.Vector(btnX, btnY),
              btn.pos.w / 2,
              btn.pos.h / 2
            ).toPolygon()
            const isPressed = SAT.testPolygonCircle(btnRect, tCircle)
            if (isPressed) {
              arr.push(btn.name)
            }
          }
        }
      }

      return arr
    }, [] as string[])

    const keyPressedControls = keysDown.map((keyCode) => keyboardMap[keyCode])

    const nextPressed = _.uniq(touchPressedControls.concat(keyPressedControls))

    // Call player APIs to press/unpress buttons on changes
    if (playerRef.current && !_.isEqual(nextPressed, pressed)) {
      _.difference(nextPressed, pressed).forEach((button) => {
        playerRef.current?.buttonDown(button)
      })
      _.difference(pressed, nextPressed).forEach((button) => {
        playerRef.current?.buttonUp(button)
      })
    }

    setPressed(nextPressed)
  }, [touches, keysDown])

  // Handle touch start events
  const onTouchStart = React.useCallback((event) => {
    if (
      !event.target.matches(
        `[data-screen], [data-screen] *, [role="listbox"], [role="listbox"] *`
      )
    ) {
      event.preventDefault()
    }

    if (!event.changedTouches || !event.changedTouches.length) {
      return
    }

    setTouches((currentTouches) => {
      return [...currentTouches, ...event.changedTouches]
    })
  }, [])

  // Handle touch move events
  const onTouchMove = React.useCallback((event) => {
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
  const onTouchEnd = React.useCallback((event) => {
    const cancelledIds = _.map(event.changedTouches, (t) => t.identifier)

    setTouches((currentTouches) => {
      return currentTouches.filter((t) => !cancelledIds.includes(t.identifier))
    })
  }, [])

  // Handle key down events
  const onKeyDown = React.useCallback((event) => {
    setKeysDown((currentKeysDown) =>
      currentKeysDown.includes(event.keyCode)
        ? currentKeysDown
        : _.uniq([...currentKeysDown, event.keyCode])
    )
  }, [])

  // Handle key up events
  const onKeyUp = React.useCallback((event) => {
    setKeysDown((currentKeysDown) =>
      !currentKeysDown.includes(event.keyCode)
        ? currentKeysDown
        : _.filter(currentKeysDown, (k) => k !== event.keyCode)
    )
  }, [])

  // Handle resize events
  const onResize = React.useCallback(() => setTouches([]), [])

  // Handle gesture start/end events
  const cancelGesture = React.useCallback((event) => event.preventDefault(), [])

  // Bind event listeners to document and window
  React.useEffect(() => {
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
        pressed,
      }}
    >
      {children}
    </ControlsContext.Provider>
  )
}

// Hook for providing controller context to components
export const useControls = () => {
  const controls = React.useContext(ControlsContext)

  if (!controls) {
    throw new Error('Missing controls context')
  }

  return controls
}

export enum ControlType {
  Circle = 'circle',
  Pill = 'pill',
}

export enum ControlPosition {
  Left = 'left',
  Right = 'right',
  Bottom = 'bottom',
}

export interface ControlSize {
  width: number
  height: number
}

interface ControlGroup {
  group: string
  position: ControlPosition
  size: ControlSize
  controls: Control[]
}

interface CircleControl {
  name: string
  type: ControlType.Circle
  pos: CircleControlPosition
}

interface PillControl {
  name: string
  type: ControlType.Pill
  pos: PillControlPosition
}

export type Control = CircleControl | PillControl

interface CircleControlPosition {
  x: number
  y: number
  r: number
}

interface PillControlPosition {
  x: number
  y: number
  w: number
  h: number
}

// Sizing constants
const lgR = 75
const smR = 50
const pillW = 100
const pillH = 30
const pillR = pillH / 2
const pillMargin = 30

// Control group configurations
export const controlsConfig: ControlGroup[] = [
  {
    group: `actions`,
    position: ControlPosition.Right,
    size: {
      width: smR * 2 * 3,
      height: smR * 2 * 3,
    },
    controls: [
      {
        name: `a`,
        type: ControlType.Circle,
        pos: {
          x: smR * 2 * 3 - lgR,
          y: lgR * 1.5,
          r: lgR,
        },
      },
      {
        name: `b`,
        type: ControlType.Circle,
        pos: {
          x: lgR,
          y: smR * 2 * 3 - lgR,
          r: lgR,
        },
      },
    ],
  },
  {
    group: `options`,
    position: ControlPosition.Bottom,
    size: {
      width: pillW * 2 + pillMargin,
      height: pillH,
    },
    controls: [
      {
        name: `start`,
        type: ControlType.Pill,
        pos: {
          x: pillW + pillMargin,
          y: 0,
          w: pillW,
          h: pillH,
        },
      },
      {
        name: `select`,
        type: ControlType.Pill,
        pos: {
          x: 0,
          y: 0,
          w: pillW,
          h: pillH,
        },
      },
    ],
  },
  {
    group: `dpad`,
    position: ControlPosition.Left,
    size: {
      width: smR * 2 * 3,
      height: smR * 2 * 3,
    },
    controls: [
      {
        name: `up`,
        type: ControlType.Circle,
        pos: {
          x: (smR * 2 * 3) / 2,
          y: smR,
          r: smR,
        },
      },
      {
        name: `down`,
        type: ControlType.Circle,
        pos: {
          x: (smR * 2 * 3) / 2,
          y: smR * 2 * 3 - smR,
          r: smR,
        },
      },
      {
        name: `left`,
        type: ControlType.Circle,
        pos: {
          x: smR,
          y: (smR * 2 * 3) / 2,
          r: smR,
        },
      },
      {
        name: `right`,
        type: ControlType.Circle,
        pos: {
          x: smR * 2 * 3 - smR,
          y: (smR * 2 * 3) / 2,
          r: smR,
        },
      },
    ],
  },
]

// Keyboard key to emulator key map
export const keyboardMap: Record<KeyboardEvent['code'], string> = {
  13: 'start',
  16: 'select',
  38: 'up',
  87: 'up',
  39: 'right',
  68: 'right',
  40: 'down',
  83: 'down',
  37: 'left',
  65: 'left',
  32: 'a',
  18: 'a',
  76: 'a',
  88: 'a',
  186: 'b',
  222: 'a',
  17: 'b',
  90: 'b',
  91: 'b',
  93: 'b',
  75: 'b',
  191: 'a',
  188: 'a',
  190: 'b',
  77: 'b',
}
