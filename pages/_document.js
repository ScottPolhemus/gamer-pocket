import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class extends Document {
  static async getInitialProps (ctx) {
    const sheet = new ServerStyleSheet()
    let muiClient
    
    try {
      const initialProps = ctx.renderPage(
        Component => props => {
          muiClient = props.muiClient
          
          return sheet.collectStyles(
            <Component {...props} />
          )
        }
      )
      
      const serverJss = muiClient ? muiClient.sheetsRegistry.toString() : ''

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            <style
              dangerouslySetInnerHTML={{ __html: serverJss }}
              id="server-jss"
              key="server-jss"
            />
            <noscript id="client-jss" key="client-jss"></noscript>
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }
  
  render() {
    return (
      <Html>
        <Head>
          <meta name="viewport" content="initial-scale=1, minimum-scale=1, maximum-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover, user-scalable=no" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}