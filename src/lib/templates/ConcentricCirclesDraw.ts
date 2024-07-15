import { ShapeDraw as AbstractShapeDraw } from '@/lib/abstract/ShapeDraw'
import { ConcentricCircles } from '@/lib/shapes/ConcentricCircles'

export class ConcentricCirclesDraw extends AbstractShapeDraw<number> {
  constructor(shapes: ConcentricCircles[]) {
    super(shapes)
  }

  displayMoveGrid() {
    this.shapes.forEach((shape) => {
      const circle = shape as ConcentricCircles
      circle.moveDraw()
    })
  }
}
