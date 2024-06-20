import { P5CanvasInstance } from '@p5-wrapper/react'

export const fitCreateCanvas = (p5: P5CanvasInstance) => {
  let w: number = p5.windowWidth - 40 * 2
  let h: number
  if (p5.windowWidth >= 640) {
    w = p5.windowWidth - 80 * 2
    h = p5.windowHeight - 225 * 2
  } else {
    h = (p5.windowHeight / 3.2) * 2
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
