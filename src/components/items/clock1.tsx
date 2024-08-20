import { drawBlock, nowTime } from '@/lib/functions'
import { Item } from '@/lib/interface'
import { Time } from '@/lib/types'
import { P5CanvasInstance } from '@p5-wrapper/react'
import { Vector } from 'p5'

type TextSize = {
  small: number
  big: number
}

export class Clock1 implements Item {
  private p5: P5CanvasInstance
  private centerPos: Vector
  private clockHandLength: Time
  private baseCircle: number
  private textSize: TextSize

  constructor(p5: P5CanvasInstance, position: Vector, length: number) {
    this.p5 = p5
    this.centerPos = position
    this.clockHandLength = {
      hour: 0.5 * length,
      minute: 0.7 * length,
      second: 0.9 * length,
      millisecond: 1.1 * length,
    }
    this.baseCircle = 0.3 * length
    this.textSize = {
      small: length * 0.05,
      big: length * 0.1,
    }
  }

  draw() {
    const { p5, centerPos, clockHandLength, baseCircle, textSize } = this

    drawBlock(p5, () => {
      p5.background(95)

      const now = nowTime()
      const { hour, minute, second, millisecond } = now

      const zeroHourAngle = p5.map(0, 0, 12, 0, p5.TWO_PI) - p5.HALF_PI
      const hourAngle = p5.map(hour, 0, 12, 0, p5.TWO_PI) - p5.HALF_PI

      const zeroMinuteAngle = p5.map(0, 0, 60, 0, p5.TWO_PI) - p5.HALF_PI
      const minuteAngle = p5.map(minute, 0, 60, 0, p5.TWO_PI) - p5.HALF_PI

      const zeroSecondAngle = p5.map(0, 0, 60, 0, p5.TWO_PI) - p5.HALF_PI
      const secondAngle = p5.map(second, 0, 60, 0, p5.TWO_PI) - p5.HALF_PI

      const zeroMillisecondAngle = p5.map(0, 0, 1000, 0, p5.TWO_PI) - p5.HALF_PI
      const millisecondAngle =
        p5.map(p5.ceil((millisecond / 1000) * 60), 0, 60, 0, p5.TWO_PI) -
        p5.HALF_PI

      drawBlock(p5, () => {
        const { hour, minute, second, millisecond } = clockHandLength

        p5.noStroke()

        // 時計の針（ミリ秒）
        p5.fill(0, 0, 90)
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
        p5.fill(0, 0, 80)
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
        p5.fill(0, 0, 40)
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
        p5.fill(0, 0, 20)
        p5.arc(
          centerPos.x,
          centerPos.y,
          hour * 2,
          hour * 2,
          zeroHourAngle,
          hourAngle,
        )

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
            p5.textSize(textSize.big)
            p5.textAlign(p5.CENTER, p5.CENTER)
            p5.text(i, pos.x, pos.y)
          }
        })

        // 文字盤の線
        drawBlock(p5, () => {
          p5.stroke(0)
          for (let i = 0; i < 60; i++) {
            const angle = p5.map(i, 0, 60, 0, p5.TWO_PI) - p5.HALF_PI
            const length = i % 5 === 0 ? 1 : 0.525
            const center = p5.createVector(
              i % 5 === 0
                ? centerPos.x
                : centerPos.x + clockHandLength.hour * p5.cos(angle),
              i % 5 === 0
                ? centerPos.y
                : centerPos.y + clockHandLength.hour * p5.sin(angle),
            )

            const pos = p5.createVector(
              center.x + clockHandLength.millisecond * length * p5.cos(angle),
              center.y + clockHandLength.millisecond * length * p5.sin(angle),
            )

            p5.strokeWeight(i % 5 === 0 ? 2 : 0.5)
            p5.line(center.x, center.y, pos.x, pos.y)
          }
        })

        p5.fill(100)
        p5.circle(centerPos.x, centerPos.y, baseCircle * 2)

        drawBlock(p5, () => {
          p5.fill(0, 0, 0, 0.01)
          p5.stroke(0, 0, 0, 0.05)
          p5.strokeWeight(5)
          p5.circle(centerPos.x, centerPos.y, baseCircle)
        })

        // 内側に 0, 10, 20, 30, 40, 50 の数字を表示
        drawBlock(p5, () => {
          p5.noStroke()
          p5.fill(0)
          for (let i = 0; i < 12; i++) {
            const angle = p5.map(i * 5, 0, 60, 0, p5.TWO_PI) - p5.HALF_PI
            const pos = p5.createVector(
              centerPos.x + baseCircle * 0.8 * p5.cos(angle),
              centerPos.y + baseCircle * 0.8 * p5.sin(angle),
            )
            p5.textSize(textSize.small)
            p5.textAlign(p5.CENTER, p5.CENTER)
            p5.text(i * 5, pos.x, pos.y)
          }
        })
      })
    })
  }
}
