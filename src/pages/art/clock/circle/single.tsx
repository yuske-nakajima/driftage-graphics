import DefaultSketch from '@/components/pages/DefaultSketch'
import { drawBlock, fitCreateCanvas, nowTime } from '@/lib/functions'
import { PageInfo, Time } from '@/lib/types'
import type { P5CanvasInstance, Sketch } from '@p5-wrapper/react'
import { Vector } from 'p5'

export const pageInfo: PageInfo = {
  title: '回る時計-シングル-',
  href: 'art/clock/circle/single',
}

const sketch: Sketch = (p5: P5CanvasInstance) => {
  let centerPos: Vector
  let clockHandLength: Time

  p5.setup = () => {
    fitCreateCanvas(p5)
    p5.colorMode(p5.HSB)

    centerPos = p5.createVector(p5.width / 2, p5.height / 2)
    const clockHandLengthBase = (p5.min(p5.width, p5.height) / 2) * 0.5

    clockHandLength = {
      hour: 0.5 * clockHandLengthBase,
      minute: 0.8 * clockHandLengthBase,
      second: clockHandLengthBase,
      millisecond: 1.2 * clockHandLengthBase,
    }
  }

  p5.draw = () => {
    drawBlock(p5, () => {
      p5.background(95)

      const now = nowTime()
      const { hour, minute, second, millisecond } = now

      // 時間は分で割ってジリジリ動く
      const hourAngle =
        p5.map((hour % 12) + minute / 60, 0, 12, 0, p5.TWO_PI) - p5.HALF_PI
      const minuteAngle = p5.map(minute, 0, 60, 0, p5.TWO_PI) - p5.HALF_PI
      const secondAngle = p5.map(second, 0, 60, 0, p5.TWO_PI) - p5.HALF_PI
      const millisecondAngle =
        p5.map(millisecond, 0, 1000, 0, p5.TWO_PI) - p5.HALF_PI

      drawBlock(p5, () => {
        const { hour, minute, second, millisecond } = clockHandLength

        p5.stroke(0)

        // 時計の針（ミリ秒）
        p5.strokeWeight(2)
        p5.line(
          centerPos.x,
          centerPos.y,
          centerPos.x + millisecond * p5.cos(millisecondAngle),
          centerPos.y + millisecond * p5.sin(millisecondAngle),
        )

        // 時計の針（秒）
        p5.strokeWeight(4)
        p5.line(
          centerPos.x,
          centerPos.y,
          centerPos.x + second * p5.cos(secondAngle),
          centerPos.y + second * p5.sin(secondAngle),
        )

        // 時計の針（分）
        p5.strokeWeight(6)
        p5.line(
          centerPos.x,
          centerPos.y,
          centerPos.x + minute * p5.cos(minuteAngle),
          centerPos.y + minute * p5.sin(minuteAngle),
        )

        // 時計の針（時間）
        p5.strokeWeight(8)
        p5.line(
          centerPos.x,
          centerPos.y,
          centerPos.x + hour * p5.cos(hourAngle),
          centerPos.y + hour * p5.sin(hourAngle),
        )
      })

      // 時計の文字盤
      drawBlock(p5, () => {
        p5.noStroke()
        p5.fill(0)

        for (let i = 0; i < 12; i++) {
          const angle = p5.map(i, 0, 12, 0, p5.TWO_PI) - p5.HALF_PI
          const pos = p5.createVector(
            centerPos.x + clockHandLength.millisecond * 1.1 * p5.cos(angle),
            centerPos.y + clockHandLength.millisecond * 1.1 * p5.sin(angle),
          )
          p5.textSize(24)
          p5.textAlign(p5.CENTER, p5.CENTER)
          p5.text(i, pos.x, pos.y)
        }
      })
    })
  }
}

const index = () => {
  const { title } = pageInfo

  return <DefaultSketch title={title} sketch={sketch} />
}
export default index
