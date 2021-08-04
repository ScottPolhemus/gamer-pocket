import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { registerSW } from 'virtual:pwa-register'

import App from './components/App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app')
)

if (import.meta.hot) {
  import.meta.hot.accept()
}

registerSW()
