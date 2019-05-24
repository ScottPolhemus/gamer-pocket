import React from 'react'
import App, { Container } from 'next/app'
import nextCookies from 'next-cookies'
import { CookiesProvider, Cookies } from 'react-cookie'

import getMuiContext from '../lib/mui'
import { SettingsProvider } from '../lib/settings'
import Player from '../components/Player'

export default class extends App {
  static async getInitialProps({ Component, ctx }) {
    const cookies = nextCookies(ctx)
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {
      cookies,
      pageProps
    }
  }

  constructor() {
    super()

    this.muiContext = getMuiContext()
  }

  componentDidMount() {
    const serverJSS = document.querySelector('#server-jss');

    if (serverJSS && serverJSS.parentNode) {
      serverJSS.parentNode.removeChild(serverJSS);
    }
  }

  render() {
    const {
      Component,
      cookies,
      pageProps
    } = this.props

    return (
      <Container>
        <CookiesProvider cookies={new Cookies(cookies)}>
          <SettingsProvider>
            <Player muiContext={this.muiContext}>
              <Component muiContext={this.muiContext} {...pageProps} />
            </Player>
          </SettingsProvider>
        </CookiesProvider>
      </Container>
    )
  }
}
