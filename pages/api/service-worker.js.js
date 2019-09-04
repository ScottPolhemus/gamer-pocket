import fs from 'fs'

// serve static service-worker script file with scope header
export default (req, res) => {
  fs.readFile('')
  res.writeHead(200, {
    'Content-Type': 'application/javascript',
  })
}