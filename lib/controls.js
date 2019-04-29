import { createContext, useContext } from 'react'

const lgR = 75;
const smR = 50;

const pillW = 100;
const pillH = 30;
const pillR = pillH / 2;
const pillMargin = 30;

export const ControlsContext = createContext({
  groupRefs: {},
  pressed: []
})

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