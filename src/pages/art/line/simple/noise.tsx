import DefaultSketch from '@/components/pages/DefaultSketch'
import { drawBlock, fitCreateCanvas, noiseLine } from '@/lib/functions'
import { PageInfo } from '@/lib/types'
import type { Sketch } from '@p5-wrapper/react'

export const pageInfo: PageInfo = {
  title: '上からまっすぐじゃない線を引く',
  description: '等間隔にまっすぐじゃない線を引く',
  href: 'art/line/simple/straight',
}

const sketch: Sketch = (p5) => {
  p5.setup = () => {
    fitCreateCanvas(p5)
    p5.colorMode(p5.HSB)

    p5.background(0, 0, 95)

    const div = p5.height / 10

    for (let i = 1; i * div < p5.height; i++) {
      drawBlock(p5, () => {
        p5.stroke(0, 0, 0)
        p5.strokeWeight(i)
        p5.noFill()
        noiseLine(
          p5,
          p5.createVector(0, i * div),
          p5.createVector(p5.width, i * div),
          10,
        )
      })
    }
  }
}

const index = () => {
  const { title, description } = pageInfo

  return (
    <DefaultSketch title={title} description={description} sketch={sketch} />
  )
}
export default index
