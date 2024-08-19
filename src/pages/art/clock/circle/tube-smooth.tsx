import DefaultSketch from '@/components/pages/DefaultSketch'
import { drawBlock, fitCreateCanvas, nowTime } from '@/lib/functions'
import { PageInfo, Time } from '@/lib/types'
import type { P5CanvasInstance, Sketch } from '@p5-wrapper/react'
import { Vector } from 'p5'

export const pageInfo: PageInfo = {
  title: '回る時計-チューブ（スムーズ）-',
  description: '回る時計-チューブ（スムーズ）-',
  href: 'art/clock/circle/tube-smooth',
}

const sketch: Sketch = (p5: P5CanvasInstance) => {
  let centerPos: Vector
  let clockHandLength: Time
  let baseCircle: number

  p5.setup = () => {
    fitCreateCanvas(p5)
    p5.colorMode(p5.HSB)
    p5.frameRate(24)

    centerPos = p5.createVector(p5.width / 2, p5.height / 2)
    const clockHandLengthBase = (p5.min(p5.width, p5.height) / 2) * 0.5

    clockHandLength = {
      hour: 0.5 * clockHandLengthBase,
      minute: 0.7 * clockHandLengthBase,
      second: 0.9 * clockHandLengthBase,
      millisecond: 1.1 * clockHandLengthBase,
    }

    baseCircle = 0.3 * clockHandLengthBase
  }

  p5.draw = () => {
    drawBlock(p5, () => {
      p5.background(95)

      const now = nowTime()
      const { hour, minute, second, millisecond } = now

      // 時間は分で割ってジリジリ動く
      const zeroHourAngle = p5.map(0, 0, 12, 0, p5.TWO_PI) - p5.HALF_PI
      const hourAngle =
        p5.TWO_PI * (((hour % 12) * 60 + minute) / 720) - p5.HALF_PI

      const zeroMinuteAngle = p5.map(0, 0, 60, 0, p5.TWO_PI) - p5.HALF_PI
      // const minuteAngle = p5.map(minute, 0, 60, 0, p5.TWO_PI) - p5.HALF_PI
      const minuteAngle =
        p5.TWO_PI * ((minute * 60 + second) / 3600) - p5.HALF_PI

      const zeroSecondAngle = p5.map(0, 0, 60, 0, p5.TWO_PI) - p5.HALF_PI
      const secondAngle =
        p5.TWO_PI * ((second * 1000 + millisecond) / 60000) - p5.HALF_PI

      const zeroMillisecondAngle = p5.map(0, 0, 1000, 0, p5.TWO_PI) - p5.HALF_PI
      const millisecondAngle = p5.TWO_PI * (millisecond / 1000) - p5.HALF_PI

      drawBlock(p5, () => {
        const { hour, minute, second, millisecond } = clockHandLength

        p5.noStroke()

        // 時計の針（ミリ秒）
        p5.fill(0, 0, 70)
        p5.arc(
          centerPos.x,
          centerPos.y,
          millisecond * 2,
          millisecond * 2,
          zeroMillisecondAngle,
          millisecondAngle,
        )
        p5.fill(95)
        p5.circle(centerPos.x, centerPos.y, second * 2)

        // 時計の針（秒）
        p5.fill(0, 0, 60)
        p5.arc(
          centerPos.x,
          centerPos.y,
          second * 2,
          second * 2,
          zeroSecondAngle,
          secondAngle,
        )
        p5.fill(95)
        p5.circle(centerPos.x, centerPos.y, minute * 2)

        // 時計の針（分）
        p5.fill(0, 0, 50)
        p5.arc(
          centerPos.x,
          centerPos.y,
          minute * 2,
          minute * 2,
          zeroMinuteAngle,
          minuteAngle,
        )

        p5.fill(95)
        p5.circle(centerPos.x, centerPos.y, hour * 2)

        // 時計の針（時間）
        p5.fill(0, 0, 40)
        p5.arc(
          centerPos.x,
          centerPos.y,
          hour * 2,
          hour * 2,
          zeroHourAngle,
          hourAngle,
        )
        p5.fill(95)
        p5.circle(centerPos.x, centerPos.y, baseCircle * 2)
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
  const { title, description } = pageInfo

  return (
    <DefaultSketch title={title} description={description} sketch={sketch} />
  )
}
export default index
