const withOffline = require('next-offline')

module.exports = withOffline({
  registerSwPrefix: 'api',
  scope: '/'
})
