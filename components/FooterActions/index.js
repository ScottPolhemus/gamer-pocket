import styled from 'styled-components'

const FooterActions = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-end;
`

export { default as BackButton } from './BackButton'
export { default as MuteButton } from './MuteButton'
export { default as SaveButton } from './SaveButton'
export { default as SettingsButton } from './SettingsButton'

export default FooterActions
