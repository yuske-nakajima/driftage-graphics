import DefaultSketch from '@/components/pages/DefaultSketch'
import { drawBlock, fitCreateCanvas, noisyPoint } from '@/lib/functions'
import { PageInfo } from '@/lib/types'
import type { Sketch } from '@p5-wrapper/react'
import { Vector } from 'p5'

export const pageInfo: PageInfo = {
  title: '格子と点',
  description: '格子と点を揺らしてみた',
  href: 'art/move/grid-2',
}

const moveLevel = 3

const sketch: Sketch = (p5) => {
  const dotPointList: Array<Vector> = []
  const xLineList: Array<number> = []
  const yLineList: Array<number> = []

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
        dotPointList.push(p5.createVector(x * interval.x, y * interval.y))
      }
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
        xLineList.forEach((x) => {
          p5.line(
            noisyPoint(p5, x, moveLevel),
            0,
            noisyPoint(p5, x, moveLevel),
            p5.height,
          )
        })
        yLineList.forEach((y) => {
          p5.line(
            0,
            noisyPoint(p5, y, moveLevel),
            p5.width,
            noisyPoint(p5, y, moveLevel),
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
  const { title, description } = pageInfo

  return (
    <DefaultSketch title={title} description={description} sketch={sketch} />
  )
}
export default index
