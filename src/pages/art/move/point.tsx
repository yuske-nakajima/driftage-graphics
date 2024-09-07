import DefaultPage from '@/components/pages/DefaultPage'
import { drawBlock, initSetup } from '@/lib/functions'
import { PageInfo } from '@/lib/types'
import type { Sketch } from '@p5-wrapper/react'
import { useSearchParams } from 'next/navigation'
import { Vector } from 'p5'

export const pageInfo: PageInfo = {
  title: '揺れる点',
  href: 'art/move/point',
}

const moveLevel = 3

const sketch = (isFullScreen: boolean): Sketch => {
  return (p5) => {
    let dotPointList: Array<Vector>

    let canvasSize: Vector
    const setup = initSetup(p5, isFullScreen, (c: Vector) => {
      canvasSize = c

      const interval = p5.createVector(
        (p5.width - 1) / 20,
        (p5.height - 1) / 20,
      )

      dotPointList = []
      for (let x = 0; x * interval.x < p5.width; x++) {
        for (let y = 0; y * interval.y < p5.height; y++) {
          dotPointList.push(p5.createVector(x * interval.x, y * interval.y))
        }
      }
    })

    p5.setup = () => {
      canvasSize = p5.createVector(0, 0)
      setup(canvasSize)
      p5.colorMode(p5.HSB)
      p5.frameRate(12)
    }

    p5.draw = () => {
      setup(canvasSize)

      drawBlock(p5, () => {
        p5.background(95)
        p5.noStroke()
        dotPointList.forEach((point) => {
          drawBlock(p5, () => {
            p5.fill(0, 100, 0)
            p5.circle(
              p5.noise(p5.frameCount * p5.random(1, moveLevel)) *
                p5.random(1, moveLevel) +
                point.x,
              point.y,
              20,
            )
          })
          drawBlock(p5, () => {
            p5.fill(0, 0, 100)
            p5.circle(point.x, point.y, 10)
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
