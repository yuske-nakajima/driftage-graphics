import DefaultSketch from '@/components/pages/DefaultSketch'
import { drawBlock, fitCreateCanvas } from '@/lib/functions'
import { SiteInfo } from '@/lib/types'
import type { Sketch } from '@p5-wrapper/react'

export const siteInfo: SiteInfo = {
  title: '上から線を引く',
  description: '等間隔にまっすぐ線を引く',
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
        p5.line(0, i * div, p5.width, i * div)
      })
    }
  }
}

const index = () => {
  const { title, description } = siteInfo

  return (
    <DefaultSketch title={title} description={description} sketch={sketch} />
  )
}
export default index
