import React from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

import { useSettings } from '../../lib/settings'

const Field = styled(TextField)`
  margin-bottom: 1rem;
`

const colors = [
  {Purple: 'rebeccapurple'},
  {Pink: 'deeppink'},
  {Red: 'crimson'},
  {Yellow: 'gold'},
  {Lime: 'limegreen'},
  {Green: 'seagreen'},
  {Teal: 'teal'},
  {Ice: 'deepskyblue'},
  {Blue: 'mediumblue'},
  {Silver: 'lightsteelblue'},
  {Black: 'black'}
]

const Settings = () => {
  const router = useRouter()
  const {
    color,
    setColor,
    screenFilter,
    setScreenFilter,
  } = useSettings()

  const onChangeColor = (event) => setColor(event.target.value)
  const onChangeScreenFilter = (event) => setScreenFilter(event.target.value)

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Field
        select
        fullWidth
        color="primary"
        variant="filled"
        label="System color"
        onChange={onChangeColor}
        value={color}
      >
        {colors.map((opt) => {
          const [label] = Object.keys(opt)
          const [value] = Object.values(opt)

          return <MenuItem key={`color-option-${value}`} value={value}>{label}</MenuItem>
        })}
      </Field>
      <Field
        select
        fullWidth
        color="primary"
        variant="filled"
        label="Screen Filter"
        onChange={onChangeScreenFilter}
        value={screenFilter}
      >
        <MenuItem value="none">None</MenuItem>
        <MenuItem value="lcd">LCD</MenuItem>
      </Field>
    </div>
  )
}

export default Settings
