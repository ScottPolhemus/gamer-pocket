/* App server */

const { createServer } = require('http')
const { join } = require('path')
const { parse } = require('url')
const next = require('next')

const app = next({
  dev: process.env.NEXT_ENV !== 'production'
})
const handleAppRequest = app.getRequestHandler()
const port = process.env.PORT || 3000

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    if (pathname === '/service-worker.js') {
      const filePath = join(__dirname, '.next', pathname)
      
      return app.serveStatic(req, res, filePath)
    }

    return handleAppRequest(req, res, parsedUrl)
  }).listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
