import { Clock1 } from '@/components/items/clock1'
import DefaultSketch from '@/components/pages/DefaultSketch'
import { fitCreateCanvas } from '@/lib/functions'
import { Shape } from '@/lib/interface'
import { PageInfo } from '@/lib/types'
import type { P5CanvasInstance, Sketch } from '@p5-wrapper/react'

export const pageInfo: PageInfo = {
  title: '回る時計-チューブ-',
  href: 'art/clock/circle/tube',
}

const sketch: Sketch = (p5: P5CanvasInstance) => {
  let clock: Shape<number>

  p5.setup = () => {
    fitCreateCanvas(p5)
    p5.colorMode(p5.HSB)

    const length = p5.min(p5.width, p5.height) * 0.35
    const pos = p5.createVector(p5.width / 2, p5.height / 2)
    // pos.sub(length, length)

    clock = new Clock1(p5, pos, length)
  }

  p5.draw = () => {
    p5.background(95)
    clock.draw()
  }
}

const index = () => {
  const { title } = pageInfo

  return <DefaultSketch title={title} sketch={sketch} />
}
export default index
