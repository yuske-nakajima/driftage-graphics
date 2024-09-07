import DefaultSketch from '@/components/pages/DefaultSketch'
import { fitCreateCanvas } from '@/lib/functions'
import { pointSquareCommon } from '@/lib/pages/art/cell/point/common'
import { PointSquareDraw } from '@/lib/templates/PointSquareDraw'
import { PageInfo } from '@/lib/types'
import type { Sketch } from '@p5-wrapper/react'

export const pageInfo: PageInfo = {
  title: 'グリッド-移動-',
  href: 'art/cell/point/left-top-square-move',
}

const sketch: Sketch = (p5) => {
  let pointSquareDraw: PointSquareDraw

  p5.setup = () => {
    fitCreateCanvas(p5)
    p5.colorMode(p5.HSB)
    p5.frameRate(24)

    pointSquareDraw = pointSquareCommon(p5)
  }

  p5.draw = () => {
    p5.background(95)
    pointSquareDraw.displayMoveGrid()
  }
}

const index = () => {
  const { title } = pageInfo

  return <DefaultSketch title={title} sketch={sketch} />
}
export default index
