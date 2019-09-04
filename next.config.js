const withOffline = require('next-offline')

module.exports = withOffline({
  registerSwPrefix: 'api',
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.alias['svgtoimg'] = 'svg2img'
    } else {
      config.resolve.alias['svgtoimg'] = 'svg-to-image'
      config.resolve.alias['datauri'] = 'lodash/noop'
    }
    
    return config
  }
})