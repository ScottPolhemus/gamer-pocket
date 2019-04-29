import { useEffect, useRef } from 'react'
import { findDOMNode } from 'react-dom'
import { createCanvas } from 'canvas'

// Hook for using canvas element with server-rendered initial content
export const useCanvas = (
  drawToCanvas,
  { width, height }
) => {
  const canvasRef = useRef()
  let imageDataURL
  
  // Draw to node-canvas on server render and create image data URL
  if (!process.browser) {
    const canvas = createCanvas(width, height)
    drawToCanvas(canvas)
    imageDataURL = canvas.toDataURL()
  }
  
  // Draw to canvas element on client render
  useEffect(() => {
    if (canvasRef.current) {
      drawToCanvas(findDOMNode(canvasRef.current))
    }
  })
  
  return [ canvasRef, imageDataURL ]
}