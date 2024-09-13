import { ShapeDraw as AbstractShapeDraw } from '@/lib/abstract/ShapeDraw'
import type { PointSquare } from '@/lib/shapes/PointSquare'

export class PointSquareDraw extends AbstractShapeDraw<number> {
  constructor(shapes: PointSquare[]) {
    super(shapes)
  }

  displayMoveGrid() {
    for (const shape of this.shapes) {
      const pointSquare = shape as PointSquare
      pointSquare.moveDraw()
    }
  }
}
