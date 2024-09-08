import DefaultPage from '@/components/pages/DefaultPage'
import { drawBlock, initSetup, noisyPoint } from '@/lib/functions'
import { PageInfo } from '@/lib/types'
import type { P5CanvasInstance, Sketch } from '@p5-wrapper/react'
import { useSearchParams } from 'next/navigation'
import { Vector } from 'p5'

export const pageInfo: PageInfo = {
  title: 'ひし形格子と点',
  href: 'art/move/grid-3',
}

const moveLevel = 3

const sketch = (isFullScreen: boolean): Sketch => {
  return (p5: P5CanvasInstance) => {
    let dotPointList: Array<Vector>
    let xLineList: Array<number>
    let yLineList: Array<number>
    let lineList: Array<{
      startPoint: Vector
      endPoint: Vector
    }>

    let smallPoint: number
    let bigPoint: number

    let canvasSize: Vector
    const setup = initSetup(p5, isFullScreen, () => {
      dotPointList = []
      xLineList = []
      yLineList = []
      lineList = []

      p5.colorMode(p5.HSB)
      p5.frameRate(12)

      const interval = p5.createVector(
        (p5.width - 1) / 20,
        (p5.height - 1) / 20,
      )

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
    })

    p5.setup = () => {
      canvasSize = setup(p5.createVector(0, 0))
    }

    p5.draw = () => {
      canvasSize = setup(canvasSize)

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
}

const index = () => {
  const { title } = pageInfo
  const searchParams = useSearchParams()
  const isFullScreen = searchParams.get('full-screen') === 'true'

  return (
    <DefaultPage
      title={title}
      sketch={sketch(isFullScreen)}
      isFullScreen={isFullScreen}
    />
  )
}
export default index
