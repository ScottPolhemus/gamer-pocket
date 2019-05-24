import React, { useContext } from 'react'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress';

import { usePlayer } from '../lib/player'

const LoadingContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LoadingGate = ({children}) => {
  const { freeze, freezeScreen } = usePlayer()

  if (freeze === null || freezeScreen === null) {
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    )
  }

  return children
}

export default LoadingGate
