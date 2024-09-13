import { drawBlock } from '@/lib/functions'
import { ConcentricCircles } from '@/lib/shapes/ConcentricCircles'
import { ConcentricCirclesDraw } from '@/lib/templates/ConcentricCirclesDraw'
import type { P5CanvasInstance } from '@p5-wrapper/react'

export const common = (p5: P5CanvasInstance): ConcentricCirclesDraw => {
  const concentricCirclesDraw = new ConcentricCirclesDraw([])

  const circleSize = 200
  const circleMaxX = Math.ceil(p5.width / circleSize) + 1
  const circleMaxY = Math.ceil(p5.height / circleSize) * 4 + 1

  // 円の場所を設定
  const diffSize = p5.createVector(circleSize / 2, 0)
  for (let y = 0; y < circleMaxY; y++) {
    for (let x = 0; x < circleMaxX; x++) {
      if (y % 2 === 0) {
        concentricCirclesDraw.add(
          new ConcentricCircles(
            p5,
            p5.createVector(x * circleSize, y * (circleSize / 4)),
            circleSize,
          ),
        )
      } else {
        concentricCirclesDraw.add(
          new ConcentricCircles(
            p5,
            p5.createVector(x * circleSize, y * (circleSize / 4)).add(diffSize),
            circleSize,
          ),
        )
      }
    }
  }

  return concentricCirclesDraw
}

export const draw = (p5: P5CanvasInstance, func: () => void) => {
  drawBlock(p5, () => {
    p5.background(100)
    p5.fill(95)
    p5.stroke(0)
    p5.strokeWeight(10)
    func()
  })
}
