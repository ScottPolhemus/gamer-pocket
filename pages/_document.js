import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet as StyledSheet } from 'styled-components'
import { ServerStyleSheets as MuiSheet } from '@material-ui/styles'

export default class extends Document {
  static async getInitialProps (ctx) {
    const styledSheet = new StyledSheet()
    const muiSheet = new MuiSheet()
    
    const originalRenderPage = ctx.renderPage
    
    ctx.renderPage = () => originalRenderPage({
      enhanceApp: App => props => muiSheet.collect(styledSheet.collectStyles(<App {...props} />)),
    })
    
    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {muiSheet.getStyleElement()}
          {styledSheet.getStyleElement()}
        </>
      )
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="viewport" content="width=device-width, viewport-fit=cover" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <link rel="apple-touch-icon" href="/app-icon.svg" />
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
