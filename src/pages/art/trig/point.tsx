import DefaultSketch from '@/components/pages/DefaultSketch'
import { drawBlock, fitCreateCanvas } from '@/lib/functions'
import { PageInfo } from '@/lib/types'
import type { P5CanvasInstance, Sketch } from '@p5-wrapper/react'
import { Color, Vector } from 'p5'

export const pageInfo: PageInfo = {
  title: '三角関数の座標',
  description: '三角関数の座標を確認',
  href: 'art/trig/point',
}

const sketch: Sketch = (p5: P5CanvasInstance) => {
  let center: Vector
  let length: number
  let halfLength: number
  let doubleLength: number

  let circleSize: number
  let strokeWidth: number
  let baseColor: Color
  let color1: Color
  let color2: Color

  p5.setup = () => {
    fitCreateCanvas(p5)
    p5.colorMode(p5.HSB)

    center = p5.createVector(p5.width / 2, p5.height / 2)
    length = p5.min(p5.width, p5.height) / 4
    halfLength = length * 0.5
    doubleLength = length * 2
    circleSize = 10
    strokeWidth = 2
    baseColor = p5.color(0, 0, 0)
    color1 = p5.color(0, 100, 100)
    color2 = p5.color(200, 100, 100)
  }

  p5.draw = () => {
    const radians = p5.radians(p5.frameCount * 2)
    const circlePoint = p5.createVector(
      center.x + length * p5.cos(radians),
      center.y + length * p5.sin(radians),
    )
    const halfCirclePoint = p5.createVector(
      center.x + halfLength * p5.cos(radians),
      center.y + halfLength * p5.sin(radians),
    )

    drawBlock(p5, () => {
      p5.background(0, 0, 95)

      drawBlock(p5, () => {
        p5.noStroke()
        p5.fill(baseColor)
        p5.circle(center.x, center.y, circleSize)
      })

      drawBlock(p5, () => {
        p5.stroke(baseColor)
        p5.strokeWeight(strokeWidth)
        p5.fill(color1)
        p5.circle(center.x, center.y, doubleLength)
      })

      drawBlock(p5, () => {
        p5.stroke(baseColor)
        p5.strokeWeight(strokeWidth)
        p5.fill(color2)
        p5.circle(halfCirclePoint.x, halfCirclePoint.y, length)
      })

      drawBlock(p5, () => {
        p5.stroke(baseColor)
        p5.strokeWeight(strokeWidth)
        p5.line(center.x, center.y, center.x, circlePoint.y)
        p5.line(center.x, center.y, circlePoint.x, center.y)
        p5.line(center.x, center.y, circlePoint.x, circlePoint.y)
        p5.line(center.x, circlePoint.y, circlePoint.x, circlePoint.y)
        p5.line(circlePoint.x, center.y, circlePoint.x, circlePoint.y)
        p5.line(circlePoint.x, center.y, center.x, circlePoint.y)
      })

      drawBlock(p5, () => {
        p5.noStroke()

        drawBlock(p5, () => {
          p5.fill(baseColor)
          p5.circle(halfCirclePoint.x, halfCirclePoint.y, circleSize)
        })

        drawBlock(p5, () => {
          p5.fill(baseColor)
          p5.circle(center.x, center.y, circleSize)
        })

        drawBlock(p5, () => {
          p5.fill(baseColor)
          p5.circle(center.x, circlePoint.y, circleSize)
        })

        drawBlock(p5, () => {
          p5.fill(baseColor)
          p5.circle(circlePoint.x, center.y, circleSize)
        })

        drawBlock(p5, () => {
          p5.fill(baseColor)
          p5.circle(circlePoint.x, circlePoint.y, circleSize)
        })
      })
    })
  }
}

const index = () => {
  const { title, description } = pageInfo

  return (
    <DefaultSketch title={title} description={description} sketch={sketch} />
  )
}
export default index
