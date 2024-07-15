import DefaultSketch from '@/components/pages/DefaultSketch'
import { fitCreateCanvas } from '@/lib/functions'
import { pointParallelogramCommon } from '@/lib/pages/art/cell/point/common'
import { PageInfo } from '@/lib/types'
import type { Sketch } from '@p5-wrapper/react'

export const pageInfo: PageInfo = {
  title: 'グリッド-平行四辺形-',
  description: '左上を基準とした平行四辺形のグリッド',
  href: 'art/cell/point/left-top-parallelogram',
}

const sketch: Sketch = (p5) => {
  p5.setup = () => {
    fitCreateCanvas(p5)
    p5.colorMode(p5.HSB)

    const pointParallelogramDraw = pointParallelogramCommon(p5)
    p5.background(95)
    pointParallelogramDraw.displayGrid()
  }
}

const index = () => {
  const { title, description } = pageInfo

  return (
    <DefaultSketch title={title} description={description} sketch={sketch} />
  )
}
export default index
