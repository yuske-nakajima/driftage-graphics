import DefaultPage from '@/components/pages/DefaultPage'
import { initSetup } from '@/lib/functions'
import { pointSquareCommon } from '@/lib/pages/art/cell/point/common'
import type { PageInfo } from '@/lib/types'
import type { P5CanvasInstance, Sketch } from '@p5-wrapper/react'
import { useSearchParams } from 'next/navigation'
import type { Vector } from 'p5'

export const pageInfo: PageInfo = {
  title: 'グリッド',
  href: 'art/cell/point/left-top-square',
}

const sketch = (isFullScreen: boolean): Sketch => {
  return (p5: P5CanvasInstance) => {
    let canvasSize: Vector
    const setup = initSetup(p5, isFullScreen, () => {
      p5.colorMode(p5.HSB)

      const pointSquareDraw = pointSquareCommon(p5)
      p5.background(95)
      pointSquareDraw.displayGrid()
    })

    p5.setup = () => {
      canvasSize = setup(p5.createVector(0, 0))
    }

    p5.draw = () => {
      canvasSize = setup(canvasSize)
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
