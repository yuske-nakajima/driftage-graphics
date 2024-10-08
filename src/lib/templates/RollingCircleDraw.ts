import { ShapeDraw as AbstractShapeDraw } from '@/lib/abstract/ShapeDraw'
import type { RollingCircle } from '@/lib/shapes/RollingCircle'

export class RollingCircleDraw extends AbstractShapeDraw<number> {
  // constructor(shapes: RollingCircle[]) {
  //   super(shapes)
  // }

  static create(shapes: RollingCircle[]): RollingCircleDraw {
    return new RollingCircleDraw(shapes)
  }

  displayMoveGrid() {
    for (const shape of this.shapes) {
      const rollingCircle = shape as RollingCircle
      rollingCircle.draw()
    }
  }
}
