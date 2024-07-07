import DefaultSketch from '@/components/pages/DefaultSketch'
import { fitCreateCanvas } from '@/lib/functions'
import { Heart } from '@/lib/shapes/heart'
import { PageInfo } from '@/lib/types'
import type { Sketch } from '@p5-wrapper/react'
import { Vector } from 'p5'

export const pageInfo: PageInfo = {
  title: 'ハート',
  description: 'ハート！！！！！',
  href: 'art/shape/heart/noise',
}

const sketch: Sketch = (p5) => {
  let center: Vector
  const step = p5.createVector(5, 10)

  const heart = new Heart(p5)

  p5.setup = () => {
    fitCreateCanvas(p5)
    p5.colorMode(p5.HSB)
    p5.frameRate(24)

    center = p5.createVector(p5.width / 2, p5.height / 2)
    heart.set(center)
  }

  p5.draw = () => {
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

const index = () => {
  const { title, description } = pageInfo

  return (
    <DefaultSketch title={title} description={description} sketch={sketch} />
  )
}
export default index
