import DefaultSketch from '@/components/pages/DefaultSketch'
import { fitCreateCanvas } from '@/lib/functions'
import { pointParallelogramCommon } from '@/lib/pages/art/cell/point/common'
import { PointParallelogramDraw } from '@/lib/templates/PointParallelogramDraw'
import { PageInfo } from '@/lib/types'
import type { Sketch } from '@p5-wrapper/react'

export const pageInfo: PageInfo = {
  title: 'グリッド-平行四辺形--移動-',
  href: 'art/cell/point/left-top-parallelogram-move',
}

const sketch: Sketch = (p5) => {
  let pointSquareDraw: PointParallelogramDraw

  p5.setup = () => {
    fitCreateCanvas(p5)
    p5.colorMode(p5.HSB)
    p5.frameRate(24)

    pointSquareDraw = pointParallelogramCommon(p5)
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
