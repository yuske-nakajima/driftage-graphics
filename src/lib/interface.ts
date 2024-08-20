import { P5CanvasInstance } from '@p5-wrapper/react'
import { Vector } from 'p5'

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

export interface Item {
  draw: () => void
}
