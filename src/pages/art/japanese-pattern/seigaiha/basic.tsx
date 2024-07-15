import DefaultSketch from '@/components/pages/DefaultSketch'
import { drawBlock, fitCreateCanvas } from '@/lib/functions'
import { Circle } from '@/lib/shapes/Circle'
import { CircleDraw } from '@/lib/templates/ShapeDraw'
import { PageInfo } from '@/lib/types'
import type { Sketch } from '@p5-wrapper/react'

export const pageInfo: PageInfo = {
  title: '【日本の文様】青海波',
  description: '同心円の一部が扇状に重なり、波のように反復させた文様。',
  href: 'art/japanese-pattern/seigaiha/basic',
}

const circleSize = 200

const sketch: Sketch = (p5) => {
  let circleMaxX: number
  let circleMaxY: number
  const circleDraw1 = new CircleDraw([])

  p5.setup = () => {
    fitCreateCanvas(p5)
    p5.colorMode(p5.HSB)

    circleMaxX = Math.ceil(p5.width / circleSize) + 1
    circleMaxY = Math.ceil(p5.height / circleSize) * 4 + 1

    // 円の場所を設定
    const diffSize = p5.createVector(circleSize / 2, 0)
    for (let y = 0; y < circleMaxY; y++) {
      for (let x = 0; x < circleMaxX; x++) {
        if (y % 2 === 0) {
          circleDraw1.add(
            new Circle(
              p5,
              p5.createVector(x * circleSize, y * (circleSize / 4)),
              circleSize,
            ),
          )
        } else {
          circleDraw1.add(
            new Circle(
              p5,
              p5
                .createVector(x * circleSize, y * (circleSize / 4))
                .add(diffSize),
              circleSize,
            ),
          )
        }
      }
    }
  }

  p5.draw = () => {
    p5.background(95)

    drawBlock(p5, () => {
      p5.fill(95)
      p5.stroke(0)
      p5.strokeWeight(5)
      circleDraw1.displayMoveGrid()
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
