import { P5CanvasInstance } from '@p5-wrapper/react'

export const fitCreateCanvas = (p5: P5CanvasInstance) => {
  let w: number = p5.windowWidth - 40 * 2
  let h: number
  if (p5.windowWidth >= 640) {
    w = p5.windowWidth - 80 * 2
    h = p5.windowHeight - 225 * 2
  } else {
    h = (p5.windowHeight / 3.2) * 2
  }

  p5.createCanvas(w, h)
}
