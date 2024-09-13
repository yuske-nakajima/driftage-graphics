import { ShapeDraw as AbstractShapeDraw } from '@/lib/abstract/ShapeDraw'
import type { PointParallelogram } from '@/lib/shapes/PointParallelogram'

export class PointParallelogramDraw extends AbstractShapeDraw<number> {
  // constructor(shapes: PointParallelogram[]) {
  //   super(shapes)
  // }

  public static create(shapes: PointParallelogram[]): PointParallelogramDraw {
    return new PointParallelogramDraw(shapes)
  }

  displayMoveGrid() {
    for (const shape of this.shapes) {
      const pointParallelogram = shape as PointParallelogram
      pointParallelogram.moveDraw()
    }
  }
}
