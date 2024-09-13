import { Clock1 } from '@/components/items/clock1'
import { ShapeDraw as AbstractShapeDraw } from '@/lib/abstract/ShapeDraw'

export class ClockDraw extends AbstractShapeDraw<number> {
  constructor(shapes: Clock1[]) {
    super(shapes)
  }

  // displayMoveGrid() {
  //   for (const shape of this.shapes) {
  //     const pointSquare = shape as Clock1
  //     pointSquare.draw()
  //   }
  // }
}
