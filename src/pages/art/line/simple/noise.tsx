import DefaultSketch from '@/components/pages/DefaultSketch'
import { drawBlock, fitCreateCanvas, noiseLine } from '@/lib/functions'
import { PageInfo } from '@/lib/types'
import type { Sketch } from '@p5-wrapper/react'
import { Vector } from 'p5'

export const pageInfo: PageInfo = {
  title: '上からまっすぐじゃない線を引く',
  href: 'art/line/simple/noise',
}

const sketch: Sketch = (p5) => {
  const noiseLineList: { start: Vector; end: Vector }[] = []

  p5.setup = () => {
    fitCreateCanvas(p5)
    p5.colorMode(p5.HSB)
    p5.frameRate(24)

    const div = p5.height / 10

    for (let i = 1; i * div < p5.height; i++) {
      noiseLineList.push({
        start: p5.createVector(0, i * div),
        end: p5.createVector(p5.width, i * div),
      })
    }
  }

  p5.draw = () => {
    p5.background(0, 0, 95)

    noiseLineList.forEach((item, i) => {
      drawBlock(p5, () => {
        p5.stroke(0, 0, 0)
        p5.strokeWeight(i + 1)
        p5.noFill()
        noiseLine(p5, item.start, item.end, 10)
      })
    })
  }
}

const index = () => {
  const { title } = pageInfo

  return <DefaultSketch title={title} sketch={sketch} />
}
export default index
