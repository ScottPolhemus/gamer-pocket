/* App server */

const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const handleDownloadRequest = require('./api/download')

const app = next({
  dev: process.env.NEXT_ENV !== 'production'
})
const handleAppRequest = app.getRequestHandler()
const port = process.env.PORT || 3000

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    if (pathname.indexOf('/download') === 0) {
      return handleDownloadRequest(req, res)
    }

    return handleAppRequest(req, res, parsedUrl)
  }).listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
