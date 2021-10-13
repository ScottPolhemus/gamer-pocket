import styled from 'styled-components'

import { screenVertical3x, screenMicro } from '../../styles/mq'

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

  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-left);
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);

  @media ${screenVertical3x} {
    justify-content: space-between;
  }

  @media ${screenMicro} {
    align-content: space-between
  }
`
