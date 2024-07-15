import DefaultSketch from '@/components/pages/DefaultSketch'
import { fitCreateCanvas } from '@/lib/functions'
import { ConcentricCirclesDraw } from '@/lib/templates/ConcentricCirclesDraw'
import { PageInfo } from '@/lib/types'
import { common, draw } from '@/pages/art/japanese-pattern/seigaiha/_common'
import type { Sketch } from '@p5-wrapper/react'

export const pageInfo: PageInfo = {
  title: '【日本の文様】青海波-移動-',
  description:
    '同心円の一部が扇状に重なり、波のように反復させた文様。左上から並べる',
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
  const { title, description } = pageInfo

  return (
    <DefaultSketch title={title} description={description} sketch={sketch} />
  )
}
export default index
