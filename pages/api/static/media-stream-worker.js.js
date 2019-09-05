import send from 'send'

// Serve static service-worker script file with custom header
export default (req, res) =>
  new Promise((resolve, reject) =>
    send(req, 'static/media-stream-worker.js')
      .on('error', reject)
      .pipe(res)
      .on('finish', resolve)
  )