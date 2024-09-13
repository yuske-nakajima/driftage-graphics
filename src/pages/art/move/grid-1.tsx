import DefaultPage from '@/components/pages/DefaultPage'
import { drawBlock, initSetup } from '@/lib/functions'
import type { PageInfo } from '@/lib/types'
import type { P5CanvasInstance, Sketch } from '@p5-wrapper/react'
import { useSearchParams } from 'next/navigation'
import type { Vector } from 'p5'

export const pageInfo: PageInfo = {
  title: '揺れる格子',
  href: 'art/move/grid-1',
}

const moveLevel = 3

const noisyPoint = (p5: P5CanvasInstance, value: number): number => {
  return (
    p5.noise(p5.frameCount * p5.random(1, moveLevel)) *
      p5.random(1, moveLevel) +
    value
  )
}

const sketch = (isFullScreen: boolean): Sketch => {
  return (p5: P5CanvasInstance) => {
    let xLineList: Array<number>
    let yLineList: Array<number>

    let canvasSize: Vector
    const setup = initSetup(p5, isFullScreen, () => {
      p5.colorMode(p5.HSB)
      p5.frameRate(12)

      const interval = p5.createVector(
        (p5.width - 1) / 20,
        (p5.height - 1) / 20,
      )

      xLineList = []
      yLineList = []

      for (let x = 0; x * interval.x < p5.width; x++) {
        xLineList.push(x * interval.x)
        for (let y = 0; y * interval.y < p5.height; y++) {
          if (x === 0) {
            yLineList.push(y * interval.y)
          }
        }
      }
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
          for (const x of xLineList) {
            p5.line(noisyPoint(p5, x), 0, noisyPoint(p5, x), p5.height)
          }
          for (const y of yLineList) {
            p5.line(0, noisyPoint(p5, y), p5.width, noisyPoint(p5, y))
          }
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
