import styled, { css } from 'styled-components'

import { buttonShadow, color } from '../../styles/color'
import { MenuOption } from '../../services/settings'

export const MenuContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const MenuBody = styled.div<{
  menu: MenuOption
  paused: boolean
}>`
  flex: 1;

  ${(props) =>
    !props.menu &&
    !!props.paused &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
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

const menuInputBase = css`
  appearance: none;
  -webkit-tap-highlight-color: transparent;
  width: 100%;
  padding: 0.5rem;
  margin: 0;
  font-size: 1.25rem;
  border: 0;
  border-radius: 4px;
`

const MenuInput = styled.input`
  ${menuInputBase}
  ${buttonShadow('white')}
`

export const MenuButton = styled.button`
  ${menuInputBase}
  position: relative;
  ${buttonShadow('black')}
  background: linear-gradient(
    to top,
    ${color('lightgray').darken(0.25).hsl().string()} 25%,
    ${color('lightgray').hsl().string()}
  );
  border: 1px solid gray;
  ${'' /* border-bottom-width: 3px; */}
  border-left-color: gray;
  border-top-color: gray;
  color: hsl(0, 0%, 40%);
  text-shadow: -1px -1px 0 hsla(0, 0%, 5%, 0.25);
  outline: none;

  &::before {
    display: none;
    content: '';
    position: absolute;
    top: -1px;
    bottom: -3px;
    left: -1px;
    right: -1px;
    background: gray;
    border: 1px solid transparent;
    border-bottom: 3px solid gray;
    border-radius: inherit;
    z-index: -1;
  }

  &:active {
    box-shadow: none;
    box-shadow: 0 0 1rem ${color('black').alpha(0.25).hsl().string()};
    transform: scale(0.99);

    &:before {
      display: none;
    }
  }
`

export const MenuSelect = styled(MenuInput).attrs({
  as: `select`,
})``

export const HiddenInput = styled.input`
  display: none;
`

export const MenuGroup = styled.div<{
  children: JSX.Element | JSX.Element[]
  horizontal?: boolean
  onClick?: React.MouseEventHandler<HTMLDivElement>
}>`
  ${(props) =>
    props.horizontal
      ? css`
          display: flex;
          margin-bottom: 1.5rem;

          ${MenuInput} {
            margin: 0 0.5rem;
          }
          
          ${MenuButton} {
            margin-left: 0.25rem;
          
            &:first-child {
              margin-left: 0;
              margin-right: 0.25rem;
            }
          }
        `
      : css`
          ${MenuInput}, ${MenuButton} {
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
  -webkit-tap-highlight-color: transparent;
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
    ${buttonShadow('darkorange')}
  }
`

export const ToggleText = styled.span`
  display: inline-block;
  margin: 0 0.5rem;
  font-family: sans-serif;
  vertical-align: middle;
  color: hsla(0, 0%, 100%, 0.5);
`

export const SettingsLink = styled.a`
  cursor: default;
`
