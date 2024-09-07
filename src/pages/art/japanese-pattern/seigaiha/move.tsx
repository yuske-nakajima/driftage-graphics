import DefaultSketch from '@/components/pages/DefaultSketch'
import { fitCreateCanvas } from '@/lib/functions'
import { common, draw } from '@/lib/pages/art/japanese-pattern/seigaiha/common'
import { ConcentricCirclesDraw } from '@/lib/templates/ConcentricCirclesDraw'
import { PageInfo } from '@/lib/types'
import type { Sketch } from '@p5-wrapper/react'

export const pageInfo: PageInfo = {
  title: '【日本の文様】青海波-移動-',
  href: 'art/japanese-pattern/seigaiha/move',
}

const sketch: Sketch = (p5) => {
  let concentricCirclesDraw: ConcentricCirclesDraw

  p5.setup = () => {
    fitCreateCanvas(p5)
    p5.colorMode(p5.HSB)
    p5.frameRate(24)

    concentricCirclesDraw = common(p5)
  }

  p5.draw = () => {
    draw(p5, () => {
      concentricCirclesDraw.displayMoveGrid()
    })
  }
}

const index = () => {
  const { title } = pageInfo

  return <DefaultSketch title={title} sketch={sketch} />
}
export default index
