import SiteContainer from '@/components/SiteContainer'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'
import SiteMainArea from '@/components/SiteMainArea'

import { fitCreateCanvas } from '@/lib/functions'
import { NextReactP5Wrapper } from '@p5-wrapper/next'
import type { P5CanvasInstance, Sketch } from '@p5-wrapper/react'

type Point = {
  x: number
  y: number
}

const NUM = 5
const R = 300
const CIRCLE_RANGE = 120
const SPEED = 0.5

const strokeCircle = (p5: P5CanvasInstance, r: number, point: Point) => {
  p5.stroke(255)
  p5.fill(0)
  const { x, y } = point
  p5.circle(x, y, r * 2)
}

// 回る粒子
const particle = (p5: P5CanvasInstance, point: Point) => {
  p5.noStroke()
  p5.fill(255)
  p5.ellipse(point.x, point.y, 20, 20)
}

const line = (p5: P5CanvasInstance, startPoint: Point, endPoint: Point) => {
  p5.stroke(255)
  p5.fill(0)
  p5.line(startPoint.x, startPoint.y, endPoint.x, endPoint.y)
}

const sketch: Sketch = (p5) => {
  const divNum = NUM - 1
  const pointList: Array<Point> = []

  let centerPoint: Point
  const angleList: Array<number> = []
  for (let i = 0; i < 360; i += CIRCLE_RANGE) {
    angleList.push(i)
  }

  p5.setup = () => {
    fitCreateCanvas(p5)
    p5.colorMode(p5.HSB)
    p5.background(0, 0, 0)

    centerPoint = {
      x: p5.width / 2,
      y: p5.height / 2,
    }
  }

  p5.draw = () => {
    p5.background(0)
    strokeCircle(p5, R, centerPoint)
    particle(p5, centerPoint)

    for (let i = 0; i < angleList.length; i++) {
      const circlePoint = {
        x: p5.cos(p5.radians(angleList[i])) * R + p5.width / 2,
        y: p5.sin(p5.radians(angleList[i])) * R + p5.height / 2,
      }

      particle(p5, circlePoint)

      line(p5, centerPoint, circlePoint)
      for (const point of pointList) {
        line(p5, point, circlePoint)
      }

      angleList[i] += SPEED
    }
  }
}

const index = () => {
  return (
    <>
      <SiteContainer>
        <SiteHeader />
        <SiteMainArea name={'hello'} description={'hello'}>
          <NextReactP5Wrapper sketch={sketch} />
        </SiteMainArea>
        <SiteFooter />
      </SiteContainer>
    </>
  )
}
export default index
