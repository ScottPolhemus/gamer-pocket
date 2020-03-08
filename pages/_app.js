import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import nextCookies from 'next-cookies'
import { CookiesProvider, Cookies } from 'react-cookie'

import { SettingsProvider } from '../lib/settings'
import GamerPocketApp from '../components/App'

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
  
  componentDidMount() {
    const serverJSS = document.querySelector('#jss-server-side');

    if (serverJSS && serverJSS.parentNode) {
      serverJSS.parentNode.removeChild(serverJSS);
    }
  }

  render() {
    const {
      Component,
      cookies = {},
      pageProps
    } = this.props

    return (
      <CookiesProvider cookies={new Cookies(cookies)}>
        <SettingsProvider>
          <GamerPocketApp>
            <Component {...pageProps} />
          </GamerPocketApp>
        </SettingsProvider>
      </CookiesProvider>
    )
  }
}
