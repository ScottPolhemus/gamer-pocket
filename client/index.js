import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'

ReactDOM.render(<App />, document.getElementById('app'))

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${process.env.ASSET_PATH}service-worker.js`).then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}
