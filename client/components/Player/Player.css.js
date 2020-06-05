import styled from 'styled-components'

import { screenVertical3x } from '../../styles/mq'

export const PlayerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: space-evenly;
  justify-content: space-around;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  @media ${screenVertical3x} {
    justify-content: space-between;
  }
`
