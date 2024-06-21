import SiteContainer from '@/components/SiteContainer'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'
import SiteMainArea from '@/components/SiteMainArea'

import { drawBlock, fitCreateCanvas, noisyPoint } from '@/lib/functions'
import { NextReactP5Wrapper } from '@p5-wrapper/next'
import type { Sketch } from '@p5-wrapper/react'
import { Vector } from 'p5'

const moveLevel = 3

const sketch: Sketch = (p5) => {
  const dotPointList: Array<Vector> = []
  const xLineList: Array<number> = []
  const yLineList: Array<number> = []
  const lineList: Array<{
    startPoint: Vector
    endPoint: Vector
  }> = []

  let smallPoint: number
  let bigPoint: number

  p5.setup = () => {
    fitCreateCanvas(p5)
    p5.colorMode(p5.HSB)
    p5.frameRate(12)

    const interval = p5.createVector((p5.width - 1) / 20, (p5.height - 1) / 20)

    for (let x = 0; x * interval.x < p5.width; x++) {
      xLineList.push(x * interval.x)
      for (let y = 0; y * interval.y < p5.height; y++) {
        if (x === 0) {
          yLineList.push(y * interval.y)
        }
        if ((x % 2 === 0 && y % 2 === 1) || (x % 2 === 1 && y % 2 === 0)) {
          dotPointList.push(p5.createVector(x * interval.x, y * interval.y))
        }
      }
    }

    for (let xi = 0; xi < xLineList.length; xi++) {
      if (xi === xLineList.length - 1) {
        continue
      }
      if (xi % 2 === 0) {
        continue
      }
      lineList.push({
        startPoint: p5.createVector(xLineList[xi], 0),
        endPoint: p5.createVector(0, yLineList[xi]),
      })
      lineList.push({
        startPoint: p5.createVector(xLineList[xi], p5.height),
        endPoint: p5.createVector(p5.width, yLineList[xi]),
      })

      // 逆
      lineList.push({
        startPoint: p5.createVector(xLineList[xi], 0),
        endPoint: p5.createVector(
          p5.width,
          yLineList[xLineList.length - 1 - xi],
        ),
      })
      lineList.push({
        startPoint: p5.createVector(xLineList[xi], p5.height),
        endPoint: p5.createVector(0, yLineList[xLineList.length - 1 - xi]),
      })
    }

    smallPoint = p5.max(4, p5.width / 100)
    bigPoint = p5.max(10, p5.width / 50)
  }

  p5.draw = () => {
    drawBlock(p5, () => {
      p5.background(95)

      drawBlock(p5, () => {
        p5.strokeWeight(2)
        p5.stroke(0)

        lineList.forEach((line) => {
          p5.line(
            noisyPoint(p5, line.startPoint.x, moveLevel),
            noisyPoint(p5, line.startPoint.y, moveLevel),
            noisyPoint(p5, line.endPoint.x, moveLevel),
            noisyPoint(p5, line.endPoint.y, moveLevel),
          )
        })
      })

      drawBlock(p5, () => {
        p5.noStroke()
        dotPointList.forEach((point) => {
          drawBlock(p5, () => {
            p5.fill(0, 100, 0)
            p5.circle(
              noisyPoint(p5, point.x, moveLevel),
              point.y,
              p5.min(20, bigPoint),
            )
          })
          drawBlock(p5, () => {
            p5.fill(0, 0, 100)
            p5.circle(point.x, point.y, p5.min(10, smallPoint))
          })
        })
      })
    })
  }
}

const index = () => {
  return (
    <>
      <SiteContainer>
        <SiteHeader />
        <SiteMainArea name={'grid'} description={'点を並べて'}>
          <NextReactP5Wrapper sketch={sketch} />
        </SiteMainArea>
        <SiteFooter />
      </SiteContainer>
    </>
  )
}
export default index
