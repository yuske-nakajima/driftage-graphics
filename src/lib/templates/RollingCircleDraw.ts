import { ShapeDraw as AbstractShapeDraw } from '@/lib/abstract/ShapeDraw'
import { RollingCircle } from '@/lib/shapes/RollingCircle'

export class RollingCircleDraw extends AbstractShapeDraw<number> {
  constructor(shapes: RollingCircle[]) {
    super(shapes)
  }

  displayMoveGrid() {
    this.shapes.forEach((shape) => {
      const rollingCircle = shape as RollingCircle
      rollingCircle.draw()
    })
  }
}
