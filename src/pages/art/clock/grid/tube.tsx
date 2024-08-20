import { Clock1 } from '@/components/items/clock1'
import DefaultSketch from '@/components/pages/DefaultSketch'
import { fitCreateCanvas } from '@/lib/functions'
import { ClockDraw } from '@/lib/templates/ClockDraw'
import { PageInfo } from '@/lib/types'
import { P5CanvasInstance, Sketch } from '@p5-wrapper/react'

export const pageInfo: PageInfo = {
  title: '回る時計-チューブ（グリッド）-',
  description: '回る時計-チューブ（グリッド）-',
  href: 'art/clock/grid/tube',
}

const clockDrawInit = (p5: P5CanvasInstance): ClockDraw => {
  const clockDraw = new ClockDraw([])
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

const sketch: Sketch = (p5) => {
  let clockDraw: ClockDraw

  p5.setup = () => {
    fitCreateCanvas(p5)
    p5.colorMode(p5.HSB)

    clockDraw = clockDrawInit(p5)
  }

  p5.draw = () => {
    p5.background(95)
    clockDraw.displayGrid()
  }
}

const index = () => {
  const { title, description } = pageInfo

  return (
    <DefaultSketch title={title} description={description} sketch={sketch} />
  )
}
export default index
