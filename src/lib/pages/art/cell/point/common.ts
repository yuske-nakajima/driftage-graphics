import { PointParallelogram } from '@/lib/shapes/PointParallelogram'
import { PointSquare } from '@/lib/shapes/PointSquare'
import { RollingCircle } from '@/lib/shapes/RollingCircle'
import { PointParallelogramDraw } from '@/lib/templates/PointParallelogramDraw'
import { PointSquareDraw } from '@/lib/templates/PointSquareDraw'
import { RollingCircleDraw } from '@/lib/templates/RollingCircleDraw'
import { P5CanvasInstance } from '@p5-wrapper/react'

export const pointSquareCommon = (p5: P5CanvasInstance): PointSquareDraw => {
  const pointSquareDraw = new PointSquareDraw([])
  const size = p5.width / 10
  const maxX = Math.ceil(p5.width / size) + 1
  const maxY = Math.ceil(p5.height / size) + 1

  for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
      pointSquareDraw.add(
        new PointSquare(p5, p5.createVector(x * size, y * size), size),
      )
    }
  }
  return pointSquareDraw
}

export const pointParallelogramCommon = (
  p5: P5CanvasInstance,
): PointSquareDraw => {
  const pointParallelogramDraw = new PointParallelogramDraw([])
  const size = p5.width / 10
  const maxX = Math.ceil(p5.width / size) + 1
  const maxY = Math.ceil(p5.height / size) + 1

  for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
      pointParallelogramDraw.add(
        new PointParallelogram(p5, p5.createVector(x * size, y * size), size),
      )
    }
  }
  return pointParallelogramDraw
}

export const rollingCircleCommon = (
  p5: P5CanvasInstance,
): RollingCircleDraw => {
  const rollingCircleDraw = new RollingCircleDraw([])
  const size = p5.width / 10
  const maxX = Math.ceil(p5.width / size) + 1
  const maxY = Math.ceil(p5.height / size) + 1

  for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
      rollingCircleDraw.add(
        new RollingCircle(p5, p5.createVector(x * size, y * size), size),
      )
    }
  }
  return rollingCircleDraw
}
