import { Time } from '@/lib/types'
import { P5CanvasInstance } from '@p5-wrapper/react'
import { Vector } from 'p5'

export const fitCreateCanvas = (p5: P5CanvasInstance) => {
  let w: number = p5.windowWidth - 40 * 2
  const h = (p5.windowHeight - 80) / 1.43

  if (p5.windowWidth >= 640) {
    w = p5.windowWidth - 80 * 2
  }

  p5.createCanvas(w, h)
}

/*
 * ブロックを描画する
 * @param p5 P5CanvasInstance
 * @param func 描画する処理
 * @returns void
 * 渡した関数をpush/popで囲んで描画する。他の処理にスタイルが影響しないようにするため。
 */
export const drawBlock = (p5: P5CanvasInstance, func: () => void) => {
  p5.push()
  func()
  p5.pop()
}

export const noisyPoint = (
  p5: P5CanvasInstance,
  value: number,
  moveLevel: number,
): number => {
  return (
    p5.noise(p5.frameCount * p5.random(1, moveLevel)) *
      p5.random(1, moveLevel) +
    value
  )
}

export const noiseLine = (
  p5: P5CanvasInstance,
  start: Vector,
  end: Vector,
  moveLevel: number,
) => {
  // p5.lineは使わない
  // startとendの間に点を打つ
  const distance = start.dist(end)
  const noiseList: Vector[] = []
  const noiseCount = p5.max(3, p5.floor(distance / 10))
  for (let i = 0; i < noiseCount; i++) {
    let x = p5.lerp(start.x, end.x, i / noiseCount)
    let y = p5.lerp(start.y, end.y, i / noiseCount)
    if (i !== 0 && i !== noiseCount - 1) {
      x = noisyPoint(p5, x, moveLevel)
      y = noisyPoint(p5, y, moveLevel)
    }
    noiseList.push(p5.createVector(x, y))
  }
  p5.beginShape()
  noiseList.forEach((v) => {
    p5.vertex(v.x, v.y)
  })
  p5.endShape()
}

export const nowTime = (): Time => {
  const now = new Date()
  return {
    hour: now.getHours(),
    minute: now.getMinutes(),
    second: now.getSeconds(),
    millisecond: now.getMilliseconds(),
  }
}
