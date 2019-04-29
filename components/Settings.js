import React from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import HomeIcon from '@material-ui/icons/Home'

const InputContainer = styled.div`
  flex: 1;
`

const BackButtonContainer = styled.div`
  text-align: right;
`

const BackButton = styled(Fab).attrs({
  color: 'primary'
})`
`

const SelectField = styled(TextField).attrs({
  fullWidth: true,
  select: true,
  variant: 'filled',
  color: 'primary'
})`
  
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
  const [{
    color = 'rebeccapurple',
  }, setCookie] = useCookies()
  
  const onChangeColor = (event) => setCookie('color', event.target.value)
  
  return (
    <>
      <InputContainer>
        <SelectField
          onChange={onChangeColor}
          value={color}
          label="System color"
        >
          {colors.map((opt) => {
            const [label] = Object.keys(opt)
            const [value] = Object.values(opt)
            
            return <MenuItem key={`color-option-${value}`} value={value}>{label}</MenuItem>
          })}
        </SelectField>
      </InputContainer>
      <BackButtonContainer>
        <BackButton onClick={() => { router.replace('/') }}>
          <HomeIcon />
        </BackButton>
      </BackButtonContainer>
    </>
  )
}

export default Settings