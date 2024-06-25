import DefaultSketch from '@/components/pages/DefaultSketch'
import { fitCreateCanvas, noiseLine } from '@/lib/functions'
import { PageInfo } from '@/lib/types'
import type { Sketch } from '@p5-wrapper/react'
import { Vector } from 'p5'

export const pageInfo: PageInfo = {
  title: 'マウスまでのまっすぐではない線',
  description: '真ん中からまっすぐではない線を引く',
  href: 'art/line/mouse/noise',
}

const sketch: Sketch = (p5) => {
  let center: Vector
  let mouse: Vector

  p5.setup = () => {
    fitCreateCanvas(p5)
    p5.colorMode(p5.HSB)

    center = p5.createVector(p5.width / 2, p5.height / 2)
    mouse = p5.createVector(p5.width / 2, p5.height / 2)
  }

  p5.draw = () => {
    p5.background(0, 0, 95)
    p5.stroke(0, 0, 0)
    p5.strokeWeight(2)
    p5.noFill()
    noiseLine(p5, center, mouse, 20)
  }

  // マウスの位置
  p5.mouseMoved = () => {
    mouse = p5.createVector(p5.mouseX, p5.mouseY)
  }
}

const index = () => {
  const { title, description } = pageInfo

  return (
    <DefaultSketch title={title} description={description} sketch={sketch} />
  )
}
export default index
