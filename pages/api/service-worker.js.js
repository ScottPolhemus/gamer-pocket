import send from 'send'

const headers = res => res.setHeader('Service-Worker-Allowed', '/')

// Serve static service-worker script file with custom header
export default (req, res) => new Promise((resolve, reject) =>
  send(req, '.next/service-worker.js')
    .on('error', reject)
    .on('headers', headers)
    .pipe(res)
    .on('finish', resolve)
)