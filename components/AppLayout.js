import React from 'react'
import { useCookies } from 'react-cookie'
import styled, { createGlobalStyle } from 'styled-components'

import Controls from './Controls'
import Screen from './Screen'
import { controlsConfig } from '../lib/controls'

const BaseStyle = createGlobalStyle`
  *, *:before, *:after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #__next {
    position: fixed;
    width: 100%;
    height: 100%;
    color: white;
    background: ${(props) => props.color};
  }

  #__next {
    display: flex;
    flex-direction: column;
  }
`

const AppContent = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex: 1;
  justify-content: space-around;
  padding-left: env(safe-area-inset-left);
  padding-bottom: env(safe-area-inset-bottom);
  padding-right: env(safe-area-inset-right);
  min-width: 320px;
`

const AppLayout = ({children}) => {
  const [{
    color = 'rebeccapurple'
  }] = useCookies()
  
  return (
    <>
      <BaseStyle color={color} />
      <AppContent>
        <Screen>
          {children}
        </Screen>
        {controlsConfig.map((g, i) => (
          <Controls
            {...g}
            key={`controls-group-${g.group}`}
          />
        ))}
      </AppContent>
    </>
  )
}

export default AppLayout