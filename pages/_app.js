import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import nextCookies from 'next-cookies'
import { CookiesProvider, Cookies } from 'react-cookie'

import { generateIconImage } from '../lib/app-icon'
import { SettingsProvider } from '../lib/settings'
import Player from '../components/Player'

export default class extends App {
  static async getInitialProps({ Component, ctx }) {
    const cookies = nextCookies(ctx)
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    
    // const icon = await generateIconImage(cookies.color)

    return {
      cookies,
      // icon,
      pageProps
    }
  }
  
  constructor() {
    super()
    
    this.state = {
      icon: ''
    }
 }

  componentDidMount() {
    const serverJSS = document.querySelector('#jss-server-side');

    if (serverJSS && serverJSS.parentNode) {
      serverJSS.parentNode.removeChild(serverJSS);
    }
    
    generateIconImage(this.props.cookies.color)
      .then((icon) => {
        console.log({icon})
        this.setState({
          icon
        })
      })
  }
  
  componentDidUpdate(prevProps) {
    console.log(this.props.cookies.color)
    if (prevProps.cookies.color !== this.props.cookies.color) {
      console.log('changed')
      generateIconImage(this.props.cookies.color)
        .then((icon) => {
          console.log({icon})
          this.setState({
            icon
          })
        })
    }
  }

  render() {
    const {
      Component,
      cookies,
      // icon,
      pageProps
    } = this.props
    const { icon } = this.state

    return (
      <Container>
        <Head>
          {!!icon && <link rel="apple-touch-icon" href={icon} />}
        </Head>
        <CookiesProvider cookies={new Cookies(cookies)}>
          <SettingsProvider>
            <Player>
              <Component {...pageProps} />
            </Player>
          </SettingsProvider>
        </CookiesProvider>
      </Container>
    )
  }
}
