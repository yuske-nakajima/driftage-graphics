import DefaultSketch from '@/components/pages/DefaultSketch'
import { fitCreateCanvas } from '@/lib/functions'
import { rollingCircleCommon } from '@/lib/pages/art/cell/point/common'
import { RollingCircleDraw } from '@/lib/templates/RollingCircleDraw'
import { PageInfo } from '@/lib/types'
import type { Sketch } from '@p5-wrapper/react'

export const pageInfo: PageInfo = {
  title: 'ぐるぐる回る-軌跡なし-',
  href: 'art/cell/point/left-top-rolling-square1',
}

const sketch: Sketch = (p5) => {
  let rollingCircleDraw: RollingCircleDraw

  p5.setup = () => {
    fitCreateCanvas(p5)
    p5.colorMode(p5.HSB)
    p5.frameRate(24)

    rollingCircleDraw = rollingCircleCommon(p5)
  }

  p5.draw = () => {
    p5.background(95)
    rollingCircleDraw.displayMoveGrid()
  }
}

const index = () => {
  const { title } = pageInfo

  return <DefaultSketch title={title} sketch={sketch} />
}
export default index
