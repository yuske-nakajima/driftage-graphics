import DefaultPage from '@/components/pages/DefaultPage'
import { initSetup } from '@/lib/functions'
import type { PageInfo } from '@/lib/types'
import type { P5CanvasInstance, Sketch } from '@p5-wrapper/react'
import { useSearchParams } from 'next/navigation'
import type { Vector } from 'p5'

export const pageInfo: PageInfo = {
  title: '三角関数基本の時計',
  href: 'art/trig/basic2',
}

const sketch = (isFullScreen: boolean): Sketch => {
  return (p5: P5CanvasInstance) => {
    const scale = (value: number): number => {
      return (p5.TWO_PI / 60) * value
    }

    let canvasSize: Vector
    let centerPos: Vector

    const setup = initSetup(p5, isFullScreen, () => {
      p5.colorMode(p5.HSB)
      p5.angleMode(p5.RADIANS)

      centerPos = p5.createVector(p5.width / 2, p5.height / 2)
    })

    p5.setup = () => {
      canvasSize = setup(p5.createVector(0, 0))
    }

    p5.draw = () => {
      canvasSize = setup(canvasSize)
      p5.background(0, 0, 90)

      // 時計
      const x =
        400 * p5.cos(scale(new Date().getSeconds()) - p5.HALF_PI) + centerPos.x
      const y =
        400 * p5.sin(scale(new Date().getSeconds()) - p5.HALF_PI) + centerPos.y
      p5.line(centerPos.x, centerPos.y, x, y)
      p5.strokeWeight(4)
      p5.ellipse(x, y, 10, 10)
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
