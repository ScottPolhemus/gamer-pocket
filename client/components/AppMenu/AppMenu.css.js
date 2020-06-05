import styled, { css } from 'styled-components'

import { buttonShadow } from '../../styles/color'

export const MenuContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const MenuBody = styled.div`
  flex: 1;

  ${(props) =>
    !props.menu &&
    !!props.paused &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: center;
    `}
`

export const MenuFooter = styled.div`
  display: flex;
  justify-content: space-between;
`

export const MenuTitle = styled.h2`
  font-weight: normal;
  font-size: 1rem;
  font-family: sans-serif;
  text-align: center;
  color: white;
`

const MenuInput = styled.input`
  appearance: none;
  width: 100%;
  padding: 0.5rem;
  margin: 0;
  font-size: 1.25rem;
  border: 0;
  border-radius: 4px;
  ${buttonShadow('white')}
`

export const MenuButton = styled(MenuInput).attrs({
  as: 'button',
})``

export const MenuSelect = styled(MenuInput).attrs({
  as: `select`,
})``

export const HiddenInput = styled.input`
  display: none;
`

export const MenuGroup = styled.div`
  ${(props) =>
    props.horizontal &&
    css`
      display: flex;
      margin: 0 -0.5rem;
      margin-bottom: 1.5rem;

      ${MenuInput} {
        margin: 0 0.5rem;
      }
    `}

  ${(props) =>
    !props.horizontal &&
    css`
      ${MenuInput} {
        margin-bottom: 1.5rem;
      }
    `}
`

export const SettingsButton = styled(MenuButton)`
  display: inline-block;
  width: auto;
  height: auto;
  margin: 0;
  margin-left: 0.5rem;
`

export const ToggleLabel = styled.label`
  position: relative;
  display: inline-block;
  vertical-align: middle;
`

export const ToggleInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  width: 0;
  height: 0;
`

export const ToggleOutline = styled(MenuButton).attrs({
  as: 'span',
})`
  display: inline-block;
  width: auto;
  margin: 0;
  vertical-align: middle;

  input:checked + & {
    ${buttonShadow('orange')}
  }
`

export const ToggleText = styled.span`
  display: inline-block;
  margin: 0 0.5rem;
  font-family: sans-serif;
  vertical-align: middle;
  color: white;
`

export const SettingsLink = styled.a`
  cursor: default;
`
