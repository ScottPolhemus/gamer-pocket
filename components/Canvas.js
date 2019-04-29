import React from 'react'
import { useCanvas } from '../lib/canvas'

const Canvas = (props) => {
  const {
    draw,
    style = {},
    ...canvasProps
  } = props
  
  const [canvasRef, imageDataURL] = useCanvas(draw, {
    width: props.width,
    height: props.height
  })
  
  const backgroundStyle = !imageDataURL ? {} : {
    backgroundImage: `url(${imageDataURL})`,
    backgroundSize: `cover`
  }
  
  return (
    <canvas
      {...canvasProps}
      ref={canvasRef}
      style={{
        ...style,
        ...backgroundStyle,
      }}
      suppressHydrationWarning
    />
  )
}

export default Canvas