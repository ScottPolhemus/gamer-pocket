import '@babel/polyfill'
import React from 'react'
import App, { Container as NextContainer } from 'next/app'
import nextCookies from 'next-cookies'

import AppContainer from '../components/AppContainer'
import getMuiClient from '../lib/mui'

export default class extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    
    const cookies = nextCookies(ctx)
    
    return {
      cookies,
      pageProps
    }
  }
  
  constructor() {
    super()
    
    this.muiClient = getMuiClient()
  }
  
  render() {
    const {
      Component,
      cookies,
      pageProps
    } = this.props
    
    return (
      <NextContainer>
        <AppContainer
          cookies={cookies}
          muiClient={this.muiClient}
        >
          <Component muiClient={this.muiClient} {...pageProps} />
        </AppContainer>
      </NextContainer>
    )
  }
}
