import { Clock1 } from '@/components/items/clock1'
import DefaultPage from '@/components/pages/DefaultPage'
import { initSetup } from '@/lib/functions'
import { Shape } from '@/lib/interface'
import { PageInfo } from '@/lib/types'
import type { P5CanvasInstance, Sketch } from '@p5-wrapper/react'
import { useSearchParams } from 'next/navigation'
import { Vector } from 'p5'

export const pageInfo: PageInfo = {
  title: '回る時計-チューブ-',
  href: 'art/clock/circle/tube',
}

const sketch = (isFullScreen: boolean): Sketch => {
  return (p5: P5CanvasInstance) => {
    let clock: Shape<number>

    let canvasSize: Vector
    const setup = initSetup(p5, isFullScreen, () => {
      p5.colorMode(p5.HSB)

      const length = p5.min(p5.width, p5.height) * 0.35
      const pos = p5.createVector(p5.width / 2, p5.height / 2)
      // pos.sub(length, length)

      clock = new Clock1(p5, pos, length)
    })

    p5.setup = () => {
      canvasSize = setup(p5.createVector(0, 0))
    }

    p5.draw = () => {
      canvasSize = setup(canvasSize)

      p5.background(95)
      clock.draw()
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
