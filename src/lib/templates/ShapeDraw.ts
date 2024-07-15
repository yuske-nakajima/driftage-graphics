import { ShapeDraw as AbstractShapeDraw } from '@/lib/abstract/ShapeDraw'
import { Circle } from '@/lib/shapes/Circle'

export class CircleDraw extends AbstractShapeDraw<number> {
  constructor(shapes: Circle[]) {
    super(shapes)
  }

  displayMoveGrid() {
    this.shapes.forEach((shape) => {
      const circle = shape as Circle
      circle.moveDraw()
    })
  }
}
