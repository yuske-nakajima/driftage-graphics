import DefaultSketch from '@/components/pages/DefaultSketch'
import { drawBlock, fitCreateCanvas, noisyPoint } from '@/lib/functions'
import { PageInfo } from '@/lib/types'
import type { Sketch } from '@p5-wrapper/react'
import { Vector } from 'p5'

export const pageInfo: PageInfo = {
  title: 'ハート',
  description: 'ハート！！！！！',
  href: 'art/shape/heart',
}

const moveLevel = 10

const sketch: Sketch = (p5) => {
  let center: Vector
  let wq: number
  let hq: number

  p5.setup = () => {
    fitCreateCanvas(p5)
    p5.colorMode(p5.HSB)
    p5.frameRate(12)

    center = p5.createVector(p5.width / 2, p5.height / 2)
    wq = p5.width / 4
    hq = p5.height / 4
  }

  p5.draw = () => {
    const topPoint = p5.createVector(
      noisyPoint(p5, center.x, moveLevel),
      noisyPoint(p5, hq + hq / 3, moveLevel),
    )
    const underPoint = p5.createVector(
      noisyPoint(p5, center.x, moveLevel),
      noisyPoint(p5, hq * 3 + hq / 2, moveLevel),
    )
    const leftControl1 = p5.createVector(
      noisyPoint(p5, wq * 1.5, moveLevel),
      noisyPoint(p5, hq - hq / 2, moveLevel),
    )
    const leftControl2 = p5.createVector(
      noisyPoint(p5, wq - wq * 1.2, moveLevel),
      noisyPoint(p5, center.y - hq * 1.2, moveLevel),
    )
    const rightControl1 = p5.createVector(
      noisyPoint(p5, p5.width - wq + wq * 1.2, moveLevel),
      noisyPoint(p5, center.y - hq * 1.2, moveLevel),
    )
    const rightControl2 = p5.createVector(
      noisyPoint(p5, p5.width - wq * 1.5, moveLevel),
      noisyPoint(p5, hq - hq / 2, moveLevel),
    )
    drawBlock(p5, () => {
      p5.background(95)

      p5.fill(p5.frameCount % 360, 100, 100) // 赤で塗りつぶし
      p5.strokeWeight(10)

      p5.beginShape()
      p5.vertex(topPoint.x, topPoint.y) // 上の頂点

      // ベジェ曲線でハートのカーブを表現
      p5.bezierVertex(
        leftControl1.x,
        leftControl1.y, // 左側のコントロールポイント1
        leftControl2.x,
        leftControl2.y, // 左側のコントロールポイント2
        underPoint.x,
        underPoint.y, // 下の頂点
      )
      // 右側
      p5.bezierVertex(
        rightControl1.x,
        rightControl1.y, // 右側のコントロールポイント2 (左右対称に調整)
        rightControl2.x,
        rightControl2.y, // 右側のコントロールポイント1 (左右対称に調整)
        topPoint.x,
        topPoint.y, // 上の頂点
      )

      p5.endShape(p5.CLOSE) // パスを閉じて塗りつぶし
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
