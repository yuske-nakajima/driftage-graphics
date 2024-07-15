import { ShapeDraw as AbstractShapeDraw } from '@/lib/abstract/ShapeDraw'
import { PointParallelogram } from '@/lib/shapes/PointParallelogram'

export class PointParallelogramDraw extends AbstractShapeDraw<number> {
  constructor(shapes: PointParallelogram[]) {
    super(shapes)
  }

  displayMoveGrid() {
    this.shapes.forEach((shape) => {
      const pointParallelogram = shape as PointParallelogram
      pointParallelogram.moveDraw()
    })
  }
}
