import { drawBlock } from '@/lib/functions'
import type { Shape } from '@/lib/interface'
import type { P5CanvasInstance } from '@p5-wrapper/react'
import type { Vector } from 'p5'

export class PointParallelogram implements Shape<number> {
  position: Vector
  current: Vector
  size: number
  p5: P5CanvasInstance

  constructor(p5: P5CanvasInstance, position: Vector, size: number) {
    this.p5 = p5
    this.position = position
    this.current = this.p5.createVector(0, 0)
    this.size = size
  }

  private move() {
    if (this.current.x <= this.position.x) {
      this.current.x = this.p5.min(this.current.x + 10, this.position.x)
    }
    if (this.current.y <= this.position.y) {
      this.current.y = this.p5.min(this.current.y + 10, this.position.y)
    }
  }

  private _draw(position: Vector) {
    // 左上を基準に並行四辺形を描画
    drawBlock(this.p5, () => {
      this.p5.fill(0, 0, 100)
      this.p5.quad(
        position.x,
        position.y,
        position.x + this.size,
        position.y,
        position.x,
        position.y + this.size,
        position.x - this.size,
        position.y + this.size,
      )
    })
    // 左上を基準に点を描画
    drawBlock(this.p5, () => {
      this.p5.rectMode(this.p5.CENTER)
      this.p5.fill(0)
      this.p5.circle(position.x, position.y, this.size / 10)
    })
  }

  draw() {
    this._draw(this.position)
  }

  moveDraw() {
    this.move()
    this._draw(this.current)
  }
}
