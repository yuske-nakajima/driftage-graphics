import { drawBlock } from '@/lib/functions'
import { NanoKONTROL2, Unit, UnitType } from '@/lib/midiControl/nanoKONTROL2'
import { P5CanvasInstance } from '@p5-wrapper/react'
import { Color, Vector } from 'p5'

export class MidiControlNanoKONTROL2 {
  private p5: P5CanvasInstance
  private productMainColor: Color
  private readonly buttonNormalColor: Color
  private readonly buttonPushedColor: Color
  private button1Size: Vector
  private button2Size: Vector
  private readonly button3Size: Vector
  private leftTop: Vector
  private data: NanoKONTROL2 | undefined
  private productWidth = 1100
  private productHeight = 310

  constructor(
    p5: P5CanvasInstance,
    productMainColor: Color,
    buttonNormalColor: Color,
    buttonPushedColor: Color,
    leftTop: Vector,
    data: NanoKONTROL2 | undefined,
  ) {
    this.p5 = p5
    this.productMainColor = productMainColor
    this.buttonNormalColor = buttonNormalColor
    this.buttonPushedColor = buttonPushedColor
    this.leftTop = leftTop
    this.data = data

    this.button1Size = this.p5.createVector(60, 30)
    this.button2Size = this.p5.createVector(60, 60)
    this.button3Size = this.p5.createVector(30, 30)
  }

  static get getWidth(): number {
    return 1100
  }

  static get getHeight(): number {
    return 310
  }

  // component
  private pushedButton1 = (
    leftTopPos: Vector,
    isPushed: boolean,
    iconShape: (leftTopPos: Vector, color: Color) => void,
  ) => {
    const { p5, buttonPushedColor, buttonNormalColor, button1Size } = this

    let buttonColor = isPushed ? buttonPushedColor : buttonNormalColor
    const { x: width1, y: height1 } = button1Size
    const buttonDiff = 8
    const leftTopPos2 = p5.createVector(
      leftTopPos.x + buttonDiff / 2,
      leftTopPos.y + buttonDiff / 2,
    )
    const width2 = width1 - buttonDiff
    const height2 = height1 - buttonDiff

    drawBlock(p5, () => {
      p5.fill(buttonColor)
      p5.rect(leftTopPos.x, leftTopPos.y, width1, height1, 15)
      p5.fill(0)
      p5.rect(leftTopPos2.x, leftTopPos2.y, width2, height2, 12)

      // buttonのアイコン
      iconShape(leftTopPos, buttonColor)
    })
  }

  private brinkButton1 = (
    leftTopPos: Vector,
    isPushed: boolean,
    iconShape: (leftTopPos: Vector, color: Color) => void,
  ) => {
    const { p5, buttonPushedColor, buttonNormalColor, button1Size } = this

    let buttonColor: Color
    if (isPushed) {
      // 点滅
      buttonColor =
        p5.frameCount % 8 < 4 ? buttonPushedColor : buttonNormalColor
    } else {
      buttonColor = buttonNormalColor
    }

    const { x: width1, y: height1 } = button1Size
    const buttonDiff = 8
    const leftTopPos2 = p5.createVector(
      leftTopPos.x + buttonDiff / 2,
      leftTopPos.y + buttonDiff / 2,
    )
    const width2 = width1 - buttonDiff
    const height2 = height1 - buttonDiff

    drawBlock(p5, () => {
      p5.fill(buttonColor)
      p5.rect(leftTopPos.x, leftTopPos.y, width1, height1, 15)
      p5.fill(0)
      p5.rect(leftTopPos2.x, leftTopPos2.y, width2, height2, 12)

      // buttonのアイコン
      iconShape(leftTopPos, buttonColor)
    })
  }

  private pushedButton2 = (
    leftTopPos: Vector,
    isPushed: boolean,
    iconShape: (leftTopPos: Vector, color: Color) => void,
  ) => {
    const { p5, buttonPushedColor, buttonNormalColor, button2Size } = this

    let buttonColor = isPushed ? buttonPushedColor : buttonNormalColor
    const { x: width1, y: height1 } = button2Size
    const buttonDiff = 8
    const leftTopPos2 = p5.createVector(
      leftTopPos.x + buttonDiff / 2,
      leftTopPos.y + buttonDiff / 2,
    )
    const width2 = width1 - buttonDiff
    const height2 = height1 - buttonDiff

    drawBlock(p5, () => {
      p5.fill(buttonColor)
      p5.rect(leftTopPos.x, leftTopPos.y, width1, height1, 15)
      p5.fill(0)
      p5.rect(leftTopPos2.x, leftTopPos2.y, width2, height2, 12)

      // buttonのアイコン
      iconShape(leftTopPos, buttonColor)
    })
  }

  private brinkButton2 = (
    leftTopPos: Vector,
    isPushed: boolean,
    iconShape: (leftTopPos: Vector, color: Color) => void,
  ) => {
    const { p5, buttonPushedColor, buttonNormalColor, button2Size } = this

    let buttonColor: Color
    if (isPushed) {
      // 点滅
      buttonColor =
        p5.frameCount % 8 < 4 ? buttonPushedColor : buttonNormalColor
    } else {
      buttonColor = buttonNormalColor
    }

    const { x: width1, y: height1 } = button2Size
    const buttonDiff = 8
    const leftTopPos2 = p5.createVector(
      leftTopPos.x + buttonDiff / 2,
      leftTopPos.y + buttonDiff / 2,
    )
    const width2 = width1 - buttonDiff
    const height2 = height1 - buttonDiff

    drawBlock(p5, () => {
      p5.fill(buttonColor)
      p5.rect(leftTopPos.x, leftTopPos.y, width1, height1, 15)
      p5.fill(0)
      p5.rect(leftTopPos2.x, leftTopPos2.y, width2, height2, 12)

      // buttonのアイコン
      iconShape(leftTopPos, buttonColor)
    })
  }

  private pushedButton3 = (
    leftTopPos: Vector,
    isPushed: boolean,
    iconShape: (leftTopPos: Vector, color: Color) => void,
  ) => {
    const { p5, buttonPushedColor, buttonNormalColor, button3Size } = this

    let buttonColor = isPushed ? buttonPushedColor : buttonNormalColor
    const { x: width1, y: height1 } = button3Size
    const buttonDiff = 6
    const leftTopPos2 = p5.createVector(
      leftTopPos.x + buttonDiff / 2,
      leftTopPos.y + buttonDiff / 2,
    )
    const width2 = width1 - buttonDiff
    const height2 = height1 - buttonDiff

    drawBlock(p5, () => {
      p5.fill(buttonColor)
      p5.rect(leftTopPos.x, leftTopPos.y, width1, height1, 5)
      p5.fill(0)
      p5.rect(leftTopPos2.x, leftTopPos2.y, width2, height2, 7)

      // buttonのアイコン
      iconShape(leftTopPos, buttonColor)
    })
  }

  private brinkButton3 = (
    leftTopPos: Vector,
    isPushed: boolean,
    iconShape: (leftTopPos: Vector, color: Color) => void,
  ) => {
    const { p5 } = this

    let buttonColor: Color
    if (isPushed) {
      // 点滅
      buttonColor =
        p5.frameCount % 8 < 4 ? this.buttonPushedColor : this.buttonNormalColor
    } else {
      buttonColor = this.buttonNormalColor
    }

    const { x: width1, y: height1 } = this.button3Size
    const buttonDiff = 6
    const leftTopPos2 = p5.createVector(
      leftTopPos.x + buttonDiff / 2,
      leftTopPos.y + buttonDiff / 2,
    )
    const width2 = width1 - buttonDiff
    const height2 = height1 - buttonDiff

    drawBlock(p5, () => {
      p5.fill(buttonColor)
      p5.rect(leftTopPos.x, leftTopPos.y, width1, height1, 5)
      p5.fill(0)
      p5.rect(leftTopPos2.x, leftTopPos2.y, width2, height2, 7)

      // buttonのアイコン
      iconShape(leftTopPos, buttonColor)
    })
  }

  private unitDisplay = (leftTopPos: Vector, data: Unit) => {
    const { p5, productHeight } = this

    // 下地
    drawBlock(p5, () => {
      p5.fill(255, 0.1)
      p5.rect(leftTopPos.x, leftTopPos.y, 82, productHeight - 80)
    })

    // knob
    drawBlock(p5, () => {
      p5.fill(15)
      p5.ellipse(leftTopPos.x + 40, leftTopPos.y + 40, 50)

      p5.fill(30)
      p5.ellipse(leftTopPos.x + 40, leftTopPos.y + 40, 30)

      // knobの値
      // 回る方向
      p5.stroke(0)
      p5.strokeWeight(2)
      const cosValue = p5.cos(p5.radians(data.knob * 1.8) - 0.5) * -16
      const sinValue = p5.sin(p5.radians(data.knob * 1.8) - 0.5) * -16
      p5.line(
        leftTopPos.x + 40,
        leftTopPos.y + 40,
        leftTopPos.x + 40 + cosValue,
        leftTopPos.y + 40 + sinValue,
      )
    })

    // 左横に縦に並ぶボタン
    this.pushedButton3(
      p5.createVector(leftTopPos.x + 10, leftTopPos.y + 80),
      data.solo,
      (leftTopPos, color) => {
        p5.fill(color)
        p5.textAlign(p5.CENTER, p5.CENTER)
        p5.text('S', leftTopPos.x + 15, leftTopPos.y + 15)
      },
    )

    this.pushedButton3(
      p5.createVector(leftTopPos.x + 10, leftTopPos.y + 80 + 40),
      data.mute,
      (leftTopPos, color) => {
        p5.fill(color)
        p5.textAlign(p5.CENTER, p5.CENTER)
        p5.text('M', leftTopPos.x + 15, leftTopPos.y + 15)
      },
    )
    this.brinkButton3(
      p5.createVector(leftTopPos.x + 10, leftTopPos.y + 80 + 2 * 40),
      data.rec,
      (leftTopPos, color) => {
        p5.fill(color)
        p5.textAlign(p5.CENTER, p5.CENTER)
        p5.text('R', leftTopPos.x + 15, leftTopPos.y + 15)
      },
    )

    // 右にスライダー
    drawBlock(p5, () => {
      const maxY = leftTopPos.y + 100
      const minY = maxY + 80

      p5.noStroke()
      p5.fill(255, 0.5)
      p5.rect(leftTopPos.x + 60, maxY - 28, 20, minY - maxY + 72)

      // ちょっと小さい四角
      p5.fill(0)
      p5.rect(leftTopPos.x + 54, maxY - 16, 12, minY - maxY + 50, 10)

      p5.stroke(50)
      p5.fill(20)
      const value = data.slider / 100
      p5.rect(leftTopPos.x + 50, minY + (maxY - minY) * value, 20, 40)
    })
  }
  // component

  public display = () => {
    const {
      p5,
      leftTop,
      productMainColor,
      pushedButton1,
      brinkButton1,
      pushedButton2,
      brinkButton2,
      unitDisplay,
      data,
      productWidth,
      productHeight,
    } = this

    drawBlock(p5, () => {
      if (!data) {
        return
      }

      const {
        trackPrevious,
        trackNext,
        cycle,
        set,
        makerPrevious,
        makerNext,
        rewind,
        fastForward,
        stop,
        play,
        record,
        unit,
      } = data

      // 大枠の四角を描画
      drawBlock(p5, () => {
        p5.noStroke()
        p5.fill(productMainColor)
        p5.rect(leftTop.x, leftTop.y, productWidth, productHeight, 30)
      })

      // 内側の四角を描画
      drawBlock(p5, () => {
        p5.stroke(255)
        p5.noFill()
        p5.rect(
          leftTop.x + 20,
          leftTop.y + 20,
          productWidth - 40,
          productHeight - 40,
          20,
        )
      })

      // 電源ONのライトを描画
      drawBlock(p5, () => {
        p5.noStroke()
        p5.fill(255)
        p5.rect(leftTop.x + 30, leftTop.y + 30, 30, 15, 10)
      })

      // KORGのロゴを描画
      drawBlock(p5, () => {
        p5.fill(255)
        p5.textFont('Arial', 20)
        p5.stroke(255)
        p5.textAlign(p5.CENTER, p5.TOP)
        p5.text('KORG', leftTop.x + 140, leftTop.y + 40)

        p5.noStroke()
        p5.text('nanoKONTROL2', leftTop.x + 140, leftTop.y + 80)
      })

      // ボタン描画
      // Track
      // previous button
      pushedButton1(
        p5.createVector(leftTop.x + 30, leftTop.y + 120),
        trackPrevious,
        (leftTopPos, color) => {
          p5.fill(color)
          p5.triangle(
            leftTopPos.x + 35,
            leftTopPos.y + 8,
            leftTopPos.x + 20,
            leftTopPos.y + 15,
            leftTopPos.x + 35,
            leftTopPos.y + 22,
          )
        },
      )
      // next button
      pushedButton1(
        p5.createVector(leftTop.x + 100, leftTop.y + 120),
        trackNext,
        (leftTopPos, color) => {
          p5.fill(color)
          p5.triangle(
            leftTopPos.x + 25,
            leftTopPos.y + 8,
            leftTopPos.x + 40,
            leftTopPos.y + 15,
            leftTopPos.x + 25,
            leftTopPos.y + 22,
          )
        },
      )
      // Track

      // Cycle
      brinkButton1(
        p5.createVector(leftTop.x + 30, leftTop.y + 170),
        cycle,
        (leftTopPos, color) => {
          p5.stroke(color)
          p5.fill(color)
          p5.textAlign(p5.CENTER, p5.CENTER)
          p5.text('Cycle', leftTopPos.x + 30, leftTopPos.y + 15)
        },
      )
      // Cycle

      // Marker
      // set button
      pushedButton1(
        p5.createVector(leftTop.x + 170, leftTop.y + 170),
        set,
        (leftTopPos, color) => {
          p5.fill(color)
          p5.textAlign(p5.CENTER, p5.CENTER)
          p5.text('Set', leftTopPos.x + 30, leftTopPos.y + 15)
        },
      )
      // previous button
      pushedButton1(
        p5.createVector(leftTop.x + 240, leftTop.y + 170),
        makerPrevious,
        (leftTopPos, color) => {
          p5.fill(color)
          p5.triangle(
            leftTopPos.x + 35,
            leftTopPos.y + 8,
            leftTopPos.x + 20,
            leftTopPos.y + 15,
            leftTopPos.x + 35,
            leftTopPos.y + 22,
          )
        },
      )
      // next button
      pushedButton1(
        p5.createVector(leftTop.x + 310, leftTop.y + 170),
        makerNext,
        (leftTopPos, color) => {
          p5.fill(color)
          p5.triangle(
            leftTopPos.x + 25,
            leftTopPos.y + 8,
            leftTopPos.x + 40,
            leftTopPos.y + 15,
            leftTopPos.x + 25,
            leftTopPos.y + 22,
          )
        },
      )
      // Marker

      // Transport
      // rewind button
      brinkButton2(
        p5.createVector(leftTop.x + 30, leftTop.y + 220),
        rewind,
        (leftTopPos, color) => {
          p5.fill(color)
          p5.triangle(
            leftTopPos.x + 30,
            leftTopPos.y + 20,
            leftTopPos.x + 15,
            leftTopPos.y + 30,
            leftTopPos.x + 30,
            leftTopPos.y + 40,
          )
          p5.triangle(
            leftTopPos.x + 45,
            leftTopPos.y + 20,
            leftTopPos.x + 30,
            leftTopPos.y + 30,
            leftTopPos.x + 45,
            leftTopPos.y + 40,
          )
        },
      )
      // fast-forward button
      brinkButton2(
        p5.createVector(leftTop.x + 100, leftTop.y + 220),
        fastForward,
        (leftTopPos, color) => {
          p5.fill(color)
          p5.triangle(
            leftTopPos.x + 15,
            leftTopPos.y + 20,
            leftTopPos.x + 30,
            leftTopPos.y + 30,
            leftTopPos.x + 15,
            leftTopPos.y + 40,
          )
          p5.triangle(
            leftTopPos.x + 30,
            leftTopPos.y + 20,
            leftTopPos.x + 45,
            leftTopPos.y + 30,
            leftTopPos.x + 30,
            leftTopPos.y + 40,
          )
        },
      )
      // stop button
      pushedButton2(
        p5.createVector(leftTop.x + 170, leftTop.y + 220),
        stop,
        (leftTopPos, color) => {
          p5.fill(color)
          p5.rect(leftTopPos.x + 18, leftTopPos.y + 18, 25)
        },
      )
      // play button
      pushedButton2(
        p5.createVector(leftTop.x + 240, leftTop.y + 220),
        play,
        (leftTopPos, color) => {
          p5.fill(color)
          p5.triangle(
            leftTopPos.x + 20,
            leftTopPos.y + 20,
            leftTopPos.x + 45,
            leftTopPos.y + 30,
            leftTopPos.x + 20,
            leftTopPos.y + 40,
          )
        },
      )
      // record button
      brinkButton2(
        p5.createVector(leftTop.x + 310, leftTop.y + 220),
        record,
        (leftTopPos, color) => {
          p5.fill(color)
          p5.ellipse(leftTopPos.x + 30, leftTopPos.y + 30, 20)
        },
      )
      // Transport
      // ボタン描画

      // unit
      for (let i = 0; i < 8; i++) {
        const leftTopPos = p5.createVector(
          leftTop.x + 400 + i * 82,
          leftTop.y + 40,
        )
        unitDisplay(leftTopPos, unit[(i + 1) as UnitType])
      }
      // unit
    })
  }
}
