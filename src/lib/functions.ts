import { P5CanvasInstance } from '@p5-wrapper/react'

export const fitCreateCanvas = (p5: P5CanvasInstance) => {
  let w: number = p5.windowWidth - 40 * 2
  const h = (p5.windowHeight - 80) / 1.43

  if (p5.windowWidth >= 640) {
    w = p5.windowWidth - 80 * 2
  }

  console.log('p5.windowWidth: ', p5.windowWidth)
  console.log('p5.windowHeight: ', p5.windowHeight)
  console.log(w / h)

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
