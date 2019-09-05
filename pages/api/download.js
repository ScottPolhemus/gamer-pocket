// TODO: Polyfill behavior with service worker for non-Safari browsers
// (Safari doesn't allow service workers to respond to file download requests or something)
import dataURIToBuffer  from 'data-uri-to-buffer'
import stringHash  from 'string-hash'

// TODO: Replace with external memcached for serverless environment
class MemoryCache {
  constructor() {
    this.store = {}
  }

  set(key, value, ttl, cb) {
    this.store[key] = value
    cb()
  }

  get(key, cb) {
    cb(null, this.store[key])
  }
}

const cache = new MemoryCache()

export default (req, res) => {
  if (req.method === 'POST') {
    // On POST request, parse form data then store file data-uri in cache, responding with string hash key
    try {
      const data = req.body.split('\n').find((str) => str.indexOf('data:application/octet-binary;base64') === 0)
      const hash = stringHash(data)
    
      return cache.set(hash, data, 86400, (err) => {
        if (err) {
          // Internal server error
          res.writeHead(500)
          return res.end()
        }

        // Success
        res.writeHead(200)
        res.end(`${hash}`)
      })
    } catch(e) {
      // Bad request
      res.writeHead(400)
      return res.end()
    }
  } else if (req.method === 'GET') {
    // On GET request, retrieve data URI from cache and respond with decoded file buffer with given filename
    const { name, hash } = req.query

    if (!name || !hash) {
      // Bad request
      res.writeHead(400)
      return res.end()
    }

    return cache.get(hash, (err, data) => {
      if (!data) {
        // Not found
        res.writeHead(404)
        return res.end()
      } else if (err) {
        // Internal server error
        res.writeHead(500)
        return res.end()
      }

      // Success
      res.writeHead(200, {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${name}"`
      })
      return res.end(dataURIToBuffer(data))
    })
  }

  // Method not allowed
  res.writeHead(405)
  res.end()
}