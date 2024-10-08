import type { P5CanvasInstance } from '@p5-wrapper/react'
import type { Vector } from 'p5'

export interface Shape<T> {
  position: Vector
  p5: P5CanvasInstance
  size: T
  draw: () => void
}

export interface ShapeDraw<T> {
  shapes: Shape<T>[]
  add: (shape: Shape<T>) => void
  displayGrid: () => void
}
