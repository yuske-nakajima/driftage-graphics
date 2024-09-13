import type { ShapeDraw as InterfaceShapeDraw, Shape } from '@/lib/interface'

export abstract class ShapeDraw<T> implements InterfaceShapeDraw<T> {
  public shapes: Shape<T>[] = []

  protected constructor(shapes: Shape<T>[]) {
    this.shapes = shapes
  }

  public add(shape: Shape<T>) {
    this.shapes.push(shape)
  }

  public displayGrid() {
    for (const shape of this.shapes) {
      shape.draw()
    }
  }
}
