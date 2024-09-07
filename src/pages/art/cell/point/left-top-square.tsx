import DefaultSketch from '@/components/pages/DefaultSketch'
import { fitCreateCanvas } from '@/lib/functions'
import { pointSquareCommon } from '@/lib/pages/art/cell/point/common'
import { PageInfo } from '@/lib/types'
import type { Sketch } from '@p5-wrapper/react'

export const pageInfo: PageInfo = {
  title: 'グリッド',
  href: 'art/cell/point/left-top-square',
}

const sketch: Sketch = (p5) => {
  p5.setup = () => {
    fitCreateCanvas(p5)
    p5.colorMode(p5.HSB)

    const pointSquareDraw = pointSquareCommon(p5)
    p5.background(95)
    pointSquareDraw.displayGrid()
  }
}

const index = () => {
  const { title } = pageInfo

  return <DefaultSketch title={title} sketch={sketch} />
}
export default index
