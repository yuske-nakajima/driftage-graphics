import DefaultPage from '@/components/pages/DefaultPage'
import { initSetup } from '@/lib/functions'
import { rollingCircleCommon } from '@/lib/pages/art/cell/point/common'
import type { RollingCircleDraw } from '@/lib/templates/RollingCircleDraw'
import type { PageInfo } from '@/lib/types'
import type { P5CanvasInstance, Sketch } from '@p5-wrapper/react'
import { useSearchParams } from 'next/navigation'
import type { Vector } from 'p5'

export const pageInfo: PageInfo = {
  title: 'ぐるぐる回る-軌跡あり-',
  href: 'art/cell/point/left-top-rolling-square2',
}

const sketch = (isFullScreen: boolean): Sketch => {
  return (p5: P5CanvasInstance) => {
    let rollingCircleDraw: RollingCircleDraw

    let canvasSize: Vector
    const setup = initSetup(p5, isFullScreen, () => {
      p5.colorMode(p5.HSB)
      p5.frameRate(24)

      rollingCircleDraw = rollingCircleCommon(p5)
    })

    p5.setup = () => {
      canvasSize = setup(p5.createVector(0, 0))
    }

    p5.draw = () => {
      canvasSize = setup(canvasSize)

      rollingCircleDraw.displayMoveGrid()
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
