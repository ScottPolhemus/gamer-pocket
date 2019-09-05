import colorValues from 'color-name'
import svgToImage from 'svg-to-image'

const renderIconSVG = (colorName = 'rebeccapurple') => {
  const [r,g,b] = colorValues[colorName]
  
  return `
    <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="rgb(${r},${g},${b})"/>
      <ellipse ry="80" rx="80" cy="108" cx="256" fill="#000"/>
      <ellipse ry="80" rx="80" cy="256" cx="108" fill="#000"/>
      <ellipse ry="80" rx="80" cy="256" cx="404" fill="#000"/>
      <ellipse ry="80" rx="80" cy="404" cx="256" fill="#000"/>
    </svg>
  `
}

export const generateIconImage = (colorName = 'rebeccapurple') =>
  new Promise((resolve, reject) =>
    svgToImage(renderIconSVG(colorName), (err, image) => {
      if (err) {
        return reject(err)
      }

      var canvas = document.createElement('canvas')
      canvas.width = 512
      canvas.height = 512
      canvas.getContext('2d').drawImage(image, 0, 0)

      return resolve(canvas.toDataURL())
    })
  )