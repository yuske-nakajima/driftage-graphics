import DefaultPage from '@/components/pages/DefaultPage'
import { initSetup } from '@/lib/functions'
import { Heart } from '@/lib/shapes/heart'
import type { PageInfo } from '@/lib/types'
import type { P5CanvasInstance, Sketch } from '@p5-wrapper/react'
import { useSearchParams } from 'next/navigation'
import type { Vector } from 'p5'

export const pageInfo: PageInfo = {
  title: 'ハート',
  href: 'art/shape/heart/move',
}

const sketch = (isFullScreen: boolean): Sketch => {
  return (p5: P5CanvasInstance) => {
    let center: Vector
    const step = p5.createVector(5, 10)

    const heart = new Heart(p5)

    let canvasSize: Vector
    const setup = initSetup(p5, isFullScreen, () => {
      p5.colorMode(p5.HSB)
      p5.frameRate(24)

      center = p5.createVector(p5.width / 2, p5.height / 2)
      heart.set(center, 100)
    })

    p5.setup = () => {
      canvasSize = setup(p5.createVector(0, 0))
    }

    p5.draw = () => {
      canvasSize = setup(canvasSize)

      heart.add(step)

      const { topPoint } = heart.get()

      // 画面外に出たら、stepを反転
      if (topPoint.y + 100 < 0 || topPoint.y + 100 > p5.height) {
        step.y *= -1
      }
      if (topPoint.x < 0 || topPoint.x > p5.width) {
        step.x *= -1
      }

      p5.background(95)
      heart.draw()
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
