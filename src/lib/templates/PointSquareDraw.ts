import { ShapeDraw as AbstractShapeDraw } from '@/lib/abstract/ShapeDraw'
import { PointSquare } from '@/lib/shapes/PointSquare'

export class PointSquareDraw extends AbstractShapeDraw<number> {
  constructor(shapes: PointSquare[]) {
    super(shapes)
  }

  displayMoveGrid() {
    this.shapes.forEach((shape) => {
      const pointSquare = shape as PointSquare
      pointSquare.moveDraw()
    })
  }
}
