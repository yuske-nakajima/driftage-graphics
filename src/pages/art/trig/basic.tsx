import DefaultSketch from '@/components/pages/DefaultSketch'
import { drawBlock, fitCreateCanvas } from '@/lib/functions'
import { PageInfo } from '@/lib/types'
import { type P5CanvasInstance, type Sketch } from '@p5-wrapper/react'

export const pageInfo: PageInfo = {
  title: '三角関数基本',
  href: 'art/trig/basic',
}

const scale = 1.5
const arcLength = 20

const sketch: Sketch = (p5: P5CanvasInstance) => {
  p5.setup = () => {
    fitCreateCanvas(p5)
    p5.colorMode(p5.HSB)
    p5.background(0, 0, 95)

    // 三角関数の定数を表示
    drawBlock(p5, () => {
      p5.textSize(20)
      p5.text('QUARTER_PI: ' + p5.QUARTER_PI, 600, 120)
      p5.text('HALF_PI: ' + p5.HALF_PI, 600, 150)
      p5.text('PI: ' + p5.PI, 600, 180)
      p5.text('TWO_PI: ' + p5.TWO_PI, 600, 210)
      p5.text('TAU: ' + p5.TAU, 600, 240)
      p5.text('DEGREES: ' + p5.DEGREES, 600, 270)
      p5.text('RADIANS: ' + p5.RADIANS, 600, 300)
    })

    // 度数法と弧度法を比較するテーブル描画
    drawBlock(p5, () => {
      p5.textSize(16)
      p5.stroke(0)
      p5.fill(0)
      p5.textAlign(p5.CENTER, p5.CENTER)
      p5.text('度数法', 100, 90)
      p5.text('弧度法', 200, 90)
      for (let i = 0; i <= 360; i += 30) {
        drawBlock(p5, () => {
          p5.text(i, 100, 120 + i * scale)
          p5.text(p5.radians(i).toFixed(2), 200, 120 + i * scale)
        })

        // 円弧
        drawBlock(p5, () => {
          p5.noStroke()

          p5.translate(300, 120 + i * scale)
          p5.fill(0, 0, 100)
          p5.circle(0, 0, arcLength * scale)

          p5.rotate(-p5.HALF_PI)
          p5.fill(0, 0, 0)
          p5.arc(0, 0, arcLength * scale, arcLength * scale, 0, p5.radians(i))
        })
        // 円弧

        // 時計の針
        drawBlock(p5, () => {
          p5.translate(400, 120 + i * scale)

          drawBlock(p5, () => {
            p5.fill(0, 0, 100)
            p5.circle(0, 0, arcLength * scale)
          })

          drawBlock(p5, () => {
            p5.stroke(0, 0, 80)
            p5.line(0, 0, 0, 0 - arcLength * 0.7)
          })

          p5.circle(0, 0, 5)

          p5.rotate(-p5.HALF_PI)
          p5.line(
            // 終点
            0,
            0,
            arcLength * 0.7 * p5.cos(p5.radians(i)),
            arcLength * 0.7 * p5.sin(p5.radians(i)),
          )
        })
        // 時計の針
      }
    })
  }
}

const index = () => {
  const { title } = pageInfo

  return <DefaultSketch title={title} sketch={sketch} />
}
export default index
