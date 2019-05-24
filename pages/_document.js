import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class extends Document {
  static async getInitialProps (ctx) {
    const sheet = new ServerStyleSheet()
    let muiContext

    try {
      const initialProps = ctx.renderPage(
        Component => props => {
          muiContext = props.muiContext
          return sheet.collectStyles(<Component {...props} />)
        }
      )
      const serverJss = muiContext ? muiContext.sheetsRegistry.toString() : ''

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
          <meta name="viewport" content="width=device-width, viewport-fit=cover" />
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
