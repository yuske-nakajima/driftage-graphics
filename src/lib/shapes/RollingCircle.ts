import { drawBlock } from '@/lib/functions'
import type { Shape } from '@/lib/interface'
import type { P5CanvasInstance } from '@p5-wrapper/react'
import type { Vector } from 'p5'

export class RollingCircle implements Shape<number> {
  position: Vector
  current: Vector
  size: number
  p5: P5CanvasInstance
  directionOfRotation: number
  circleSize: number

  constructor(p5: P5CanvasInstance, position: Vector, size: number) {
    this.p5 = p5
    this.position = position
    this.current = this.p5.createVector(0, 0)
    this.size = size
    this.directionOfRotation = this.p5.random([1, -1])
    this.circleSize = this.p5.random([4, 5, 6, 7, 8, 9, 10, 11, 12])
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
    // 左上を基準に正方形を描画
    drawBlock(this.p5, () => {
      this.p5.rectMode(this.p5.CORNER)
      this.p5.fill(0, 0, 100, 0.05)
      this.p5.stroke(0, 0, 100)
      this.p5.rect(position.x, position.y, this.size, this.size)
    })

    const point = this.p5.createVector(
      position.x + this.size / 2,
      position.y + this.size / 2,
    )
    drawBlock(this.p5, () => {
      // 三角関数を使って point の上に円を描画
      const radius = this.size / 2.5
      const angle =
        this.p5.frameCount * 0.1 + this.p5.noise(point.x, point.y) * 10
      // const angle = this.p5.frameCount * 0.1
      const x = point.x + radius * this.p5.cos(angle * this.directionOfRotation)
      const y = point.y + radius * this.p5.sin(angle * this.directionOfRotation)
      this.p5.noStroke()
      this.p5.fill(0, 100, 0)
      // sizeにnoiseを加えることで円の大きさを変化させる
      const size = this.size / 16 + (this.p5.noise(x, y) * this.size) / 16
      // const size = this.size / this.circleSize
      this.p5.circle(x, y, size)
    })

    drawBlock(this.p5, () => {
      // this.p5.fill(0, 100, 0)
      // this.p5.circle(point.x, point.y, this.size / 20)
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
