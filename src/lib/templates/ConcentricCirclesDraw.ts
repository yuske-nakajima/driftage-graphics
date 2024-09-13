import { ShapeDraw as AbstractShapeDraw } from '@/lib/abstract/ShapeDraw'
import type { ConcentricCircles } from '@/lib/shapes/ConcentricCircles'

export class ConcentricCirclesDraw extends AbstractShapeDraw<number> {
  // constructor(shapes: ConcentricCircles[]) {
  //   super(shapes)
  // }

  static create(shapes: ConcentricCircles[]): ConcentricCirclesDraw {
    return new ConcentricCirclesDraw(shapes)
  }

  displayMoveGrid() {
    for (const shape of this.shapes) {
      const circle = shape as ConcentricCircles
      circle.moveDraw()
    }
  }
}
