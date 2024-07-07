import { drawBlock } from '@/lib/functions'
import type { P5CanvasInstance } from '@p5-wrapper/react'
import { Vector } from 'p5'

export class Heart {
  p5: P5CanvasInstance

  topPoint: Vector
  underPoint: Vector
  leftControl1: Vector
  leftControl2: Vector
  rightControl1: Vector
  rightControl2: Vector

  constructor(p5: P5CanvasInstance) {
    this.p5 = p5
    this.topPoint = p5.createVector()
    this.underPoint = p5.createVector()
    this.leftControl1 = p5.createVector()
    this.leftControl2 = p5.createVector()
    this.rightControl1 = p5.createVector()
    this.rightControl2 = p5.createVector()
  }

  public set(center: Vector, size: number) {
    const p5 = this.p5

    const fourthSize = size * 4
    const doubleSize = size * 2
    const halfSize = size / 2
    const quoteSize = size / 4

    this.topPoint = p5.createVector(center.x, center.y - halfSize)
    this.underPoint = p5.createVector(center.x, center.y + halfSize + size)
    this.leftControl1 = p5.createVector(
      p5.max(0, center.x - quoteSize),
      center.y - doubleSize,
    )
    this.leftControl2 = p5.createVector(
      p5.max(0, center.x - fourthSize),
      center.y - halfSize,
    )
    this.rightControl1 = p5.createVector(
      p5.min(p5.width, center.x + quoteSize),
      center.y - doubleSize,
    )
    this.rightControl2 = p5.createVector(
      p5.min(p5.width, center.x + fourthSize),
      center.y - halfSize,
    )
  }

  public get() {
    return {
      topPoint: this.topPoint,
      underPoint: this.underPoint,
      leftControl1: this.leftControl1,
      leftControl2: this.leftControl2,
      rightControl1: this.rightControl1,
      rightControl2: this.rightControl2,
    }
  }

  public add(value: Vector) {
    this.topPoint = this.topPoint.add(value)
    this.underPoint = this.underPoint.add(value)
    this.leftControl1 = this.leftControl1.add(value)
    this.leftControl2 = this.leftControl2.add(value)
    this.rightControl1 = this.rightControl1.add(value)
    this.rightControl2 = this.rightControl2.add(value)
  }

  public draw() {
    const p5 = this.p5

    drawBlock(p5, () => {
      p5.fill(p5.frameCount % 360, 100, 100)
      p5.strokeWeight(10)

      p5.beginShape()
      p5.vertex(this.topPoint.x, this.topPoint.y)

      // ベジェ曲線でハートのカーブを表現
      p5.bezierVertex(
        this.leftControl1.x,
        this.leftControl1.y,
        this.leftControl2.x,
        this.leftControl2.y,
        this.underPoint.x,
        this.underPoint.y,
      )
      // 右側
      p5.bezierVertex(
        this.rightControl2.x,
        this.rightControl2.y,
        this.rightControl1.x,
        this.rightControl1.y,
        this.topPoint.x,
        this.topPoint.y,
      )

      p5.endShape(p5.CLOSE)
    })
  }
}
