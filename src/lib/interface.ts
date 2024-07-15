import { Vector } from 'p5'

export interface Shape<T> {
  position: Vector
  size: T
  draw: () => void
}

export interface ShapeDraw<T> {
  shapes: Shape<T>[]
  add: (shape: Shape<T>) => void
  displayGrid: () => void
}
