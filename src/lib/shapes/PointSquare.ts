import { drawBlock } from '@/lib/functions'
import { Shape } from '@/lib/interface'
import { P5CanvasInstance } from '@p5-wrapper/react'
import { Vector } from 'p5'

export class PointSquare implements Shape<number> {
  position: Vector
  size: number
  p5: P5CanvasInstance

  constructor(p5: P5CanvasInstance, position: Vector, size: number) {
    this.p5 = p5
    this.position = position
    this.size = size
  }

  draw() {
    // 左上を基準に正方形を描画
    drawBlock(this.p5, () => {
      this.p5.rectMode(this.p5.CORNER)
      this.p5.noFill()
      this.p5.rect(this.position.x, this.position.y, this.size, this.size)
    })

    // 左上を基準に点を描画
    drawBlock(this.p5, () => {
      this.p5.rectMode(this.p5.CENTER)
      this.p5.fill(0)
      this.p5.circle(this.position.x, this.position.y, this.size / 10)
    })
  }
}
