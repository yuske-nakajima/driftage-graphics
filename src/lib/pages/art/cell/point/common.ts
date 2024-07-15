import { PointSquare } from '@/lib/shapes/PointSquare'
import { PointSquareDraw } from '@/lib/templates/PointSquareDraw'
import { P5CanvasInstance } from '@p5-wrapper/react'

export const common = (p5: P5CanvasInstance): PointSquareDraw => {
  const pointSquareDraw = new PointSquareDraw([])
  const circleSize = 100
  const circleMaxX = Math.ceil(p5.width / circleSize) + 1
  const circleMaxY = Math.ceil(p5.height / circleSize) + 1

  for (let y = 0; y < circleMaxY; y++) {
    for (let x = 0; x < circleMaxX; x++) {
      pointSquareDraw.add(
        new PointSquare(
          p5,
          p5.createVector(x * circleSize, y * circleSize),
          circleSize,
        ),
      )
    }
  }
  return pointSquareDraw
}
