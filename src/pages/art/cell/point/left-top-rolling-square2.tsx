import DefaultSketch from '@/components/pages/DefaultSketch'
import { fitCreateCanvas } from '@/lib/functions'
import { rollingCircleCommon } from '@/lib/pages/art/cell/point/common'
import { RollingCircleDraw } from '@/lib/templates/RollingCircleDraw'
import { PageInfo } from '@/lib/types'
import type { Sketch } from '@p5-wrapper/react'

export const pageInfo: PageInfo = {
  title: 'ぐるぐる回る-軌跡あり-',
  description: 'ぐるぐる回る-軌跡あり-',
  href: 'art/cell/point/left-top-rolling-square2',
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
    rollingCircleDraw.displayMoveGrid()
  }
}

const index = () => {
  const { title, description } = pageInfo

  return (
    <DefaultSketch title={title} description={description} sketch={sketch} />
  )
}
export default index
