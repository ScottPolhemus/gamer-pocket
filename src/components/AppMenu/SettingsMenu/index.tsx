import * as React from 'react'

import {
  useSettings,
  ColorOption,
  ScreenFilterOption,
} from '../../../services/settings'
import { MenuGroup, MenuSelect } from '../AppMenu.css'

const colors = [
  { Purple: ColorOption.Purple },
  { Pink: ColorOption.Pink },
  { Red: ColorOption.Red },
  { Yellow: ColorOption.Yellow },
  { Lime: ColorOption.Lime },
  { Green: ColorOption.Green },
  { Teal: ColorOption.Teal },
  { Ice: ColorOption.Ice },
  { Blue: ColorOption.Blue },
  { Silver: ColorOption.Silver },
  { Black: ColorOption.Black },
]

const Settings = () => {
  const { color, setColor, screenFilter, setScreenFilter } = useSettings()

  const onChangeColor = (event: React.ChangeEvent<HTMLInputElement>) =>
    setColor(event.target.value as ColorOption)
  const onChangeScreenFilter = (event: React.ChangeEvent<HTMLInputElement>) =>
    setScreenFilter(event.target.value as ScreenFilterOption)

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
