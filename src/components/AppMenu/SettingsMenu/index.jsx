import React from 'react'

import { useSettings } from '../../../services/settings'
import { MenuGroup, MenuSelect } from '../AppMenu.css'

const colors = [
  { Purple: 'rebeccapurple' },
  { Pink: 'deeppink' },
  { Red: 'crimson' },
  { Yellow: 'gold' },
  { Lime: 'limegreen' },
  { Green: 'seagreen' },
  { Teal: 'teal' },
  { Ice: 'deepskyblue' },
  { Blue: 'mediumblue' },
  { Silver: 'lightsteelblue' },
  { Black: 'black' },
]

const Settings = () => {
  const { color, setColor, screenFilter, setScreenFilter } = useSettings()

  const onChangeColor = (event) => setColor(event.target.value)
  const onChangeScreenFilter = (event) => setScreenFilter(event.target.value)

  return (
    <MenuGroup onClick={(event) => event.stopPropagation()}>
      <MenuSelect onChange={onChangeColor} value={color}>
        {colors.map((opt) => {
          const [label] = Object.keys(opt)
          const [value] = Object.values(opt)

          return (
            <option key={`color-option-${value}`} value={value}>
              {label}
            </option>
          )
        })}
      </MenuSelect>
      <MenuSelect onChange={onChangeScreenFilter} value={screenFilter}>
        <option value="none">None</option>
        <option value="lcd">LCD</option>
      </MenuSelect>
    </MenuGroup>
  )
}

export default Settings
