import { Shape } from '@/lib/interface'
import { P5CanvasInstance } from '@p5-wrapper/react'
import { Vector } from 'p5'

export class ConcentricCircles implements Shape<number> {
  position: Vector
  current: Vector
  size: number
  p5: P5CanvasInstance

  constructor(p5: P5CanvasInstance, position: Vector, size: number) {
    this.current = p5.createVector(0, 0)
    this.position = position
    this.size = size
    this.p5 = p5
  }

  private move() {
    if (this.current.x <= this.position.x) {
      this.current.x = this.p5.min(this.current.x + 25, this.position.x)
    }
    if (this.current.y <= this.position.y) {
      this.current.y = this.p5.min(this.current.y + 25, this.position.y)
    }
  }

  public draw() {
    const size = this.size / 4
    for (let i = 4; i > 0; i--) {
      this.p5.ellipse(this.position.x, this.position.y, size * i, size * i)
    }
  }

  public moveDraw() {
    this.move()
    const size = this.size / 4
    for (let i = 4; i > 0; i--) {
      this.p5.ellipse(this.current.x, this.current.y, size * i, size * i)
    }
  }
}
