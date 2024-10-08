import { Clock1 } from '@/components/items/clock1'
import DefaultPage from '@/components/pages/DefaultPage'
import { initSetup } from '@/lib/functions'
import { ClockDraw } from '@/lib/templates/ClockDraw'
import type { PageInfo } from '@/lib/types'
import type { P5CanvasInstance, Sketch } from '@p5-wrapper/react'
import { useSearchParams } from 'next/navigation'
import type { Vector } from 'p5'

export const pageInfo: PageInfo = {
  title: '回る時計-チューブ（グリッド）-',
  href: 'art/clock/grid/tube',
}

const clockDrawInit = (p5: P5CanvasInstance): ClockDraw => {
  const clockDraw = ClockDraw.create([])
  const size = p5.max(150, p5.width / 5)
  const maxX = Math.ceil(p5.width / size) + 1
  const maxY = Math.ceil(p5.height / size) + 1

  for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
      clockDraw.add(
        new Clock1(
          p5,
          p5.createVector(x * size - size / 2, y * size - size / 2),
          size * 0.375,
        ),
      )
    }
  }
  return clockDraw
}

const sketch = (isFullScreen: boolean): Sketch => {
  return (p5: P5CanvasInstance) => {
    let clockDraw: ClockDraw

    let canvasSize: Vector
    const setup = initSetup(p5, isFullScreen, () => {
      p5.colorMode(p5.HSB)

      clockDraw = clockDrawInit(p5)
    })

    p5.setup = () => {
      canvasSize = setup(p5.createVector(0, 0))
    }

    p5.draw = () => {
      canvasSize = setup(canvasSize)

      p5.background(95)
      clockDraw.displayGrid()
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
