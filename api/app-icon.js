/*
 * Server-rendered SVG app icon (uses cookie preference for background color)
 */

const cookie = require('cookie')
const colorValues = require('color-name')
const svg2img = require('svg2img')

const icon = (color) => `
  <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${color}"/>
    <ellipse ry="80" rx="80" cy="108" cx="256" fill="#000"/>
    <ellipse ry="80" rx="80" cy="256" cx="108" fill="#000"/>
    <ellipse ry="80" rx="80" cy="256" cx="404" fill="#000"/>
    <ellipse ry="80" rx="80" cy="404" cx="256" fill="#000"/>
  </svg>
`

module.exports = (req, res) => {
  const cookies = cookie.parse(req.headers.cookie || '');
  let colorName = cookies.color || 'rebeccapurple'
  const [r,g,b] = colorValues[colorName];
  const color = `rgb(${r},${g},${b})`
  
  const svg = icon(color)
  
  res.writeHead(200, {
    'Content-Type': 'image/png',
  })
  
  svg2img(svg, (err, buffer) => {
    res.end(buffer)
  })
}