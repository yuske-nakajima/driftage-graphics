import DefaultSketch from '@/components/pages/DefaultSketch'
import { fitCreateCanvas } from '@/lib/functions'
import { common, draw } from '@/lib/pages/art/japanese-pattern/seigaiha/common'
import { PageInfo } from '@/lib/types'
import type { Sketch } from '@p5-wrapper/react'

export const pageInfo: PageInfo = {
  title: '【日本の文様】青海波',
  description: '同心円の一部が扇状に重なり、波のように反復させた文様。',
  href: 'art/japanese-pattern/seigaiha/basic',
}

const sketch: Sketch = (p5) => {
  p5.setup = () => {
    fitCreateCanvas(p5)
    p5.colorMode(p5.HSB)

    const concentricCirclesDraw = common(p5)

    draw(p5, () => {
      concentricCirclesDraw.displayGrid()
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
