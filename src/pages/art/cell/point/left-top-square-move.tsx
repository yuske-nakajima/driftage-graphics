import DefaultSketch from '@/components/pages/DefaultSketch'
import { fitCreateCanvas } from '@/lib/functions'
import { common } from '@/lib/pages/art/cell/point/common'
import { PointSquareDraw } from '@/lib/templates/PointSquareDraw'
import { PageInfo } from '@/lib/types'
import type { Sketch } from '@p5-wrapper/react'

export const pageInfo: PageInfo = {
  title: 'グリッド-移動-',
  description: '左上を基準とした正方形のグリッド',
  href: 'art/cell/point/left-top-square-move',
}

const sketch: Sketch = (p5) => {
  let pointSquareDraw: PointSquareDraw

  p5.setup = () => {
    fitCreateCanvas(p5)
    p5.colorMode(p5.HSB)

    pointSquareDraw = common(p5)
  }

  p5.draw = () => {
    p5.background(95)
    pointSquareDraw.displayMoveGrid()
  }
}

const index = () => {
  const { title, description } = pageInfo

  return (
    <DefaultSketch title={title} description={description} sketch={sketch} />
  )
}
export default index
