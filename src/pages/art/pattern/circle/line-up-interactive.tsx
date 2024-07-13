import DefaultSketch from '@/components/pages/DefaultSketch'
import { KEY_CODE } from '@/lib/constants'
import { drawBlock, fitCreateCanvas } from '@/lib/functions'
import { PageInfo } from '@/lib/types'
import type { Sketch } from '@p5-wrapper/react'
import { Vector } from 'p5'

export const pageInfo: PageInfo = {
  title: '円を並べた模様（操作可能）',
  description: '円を並べて拡張した',
  href: 'art/pattern/circle/line-up-interactive',
}

type circleType = {
  x: number
  y: number
  hue: number
}

const InputModeList: string[] = [
  'MOVE',
  'CIRCLE_SIZE',
  'COLOR_SIZE',
  'RANGE',
  'HUE',
  'SATURATION',
  'BRIGHTNESS',
]

type InputMode = (typeof InputModeList)[number]

type DisplayModeType = {
  start: number
  end: number
}

type InputModeMap = {
  [key in InputMode]: {
    value: number
    displayText: string
    up: () => void
    down: () => void
  }
}

const STEP = 10

const sketch: Sketch = (p5) => {
  const inputModeMap: InputModeMap = {
    MOVE: {
      value: 0,
      displayText: '向き',
      up: () => {
        inputModeMap.MOVE.value = (inputModeMap.MOVE.value + 1) % 2
      },
      down: () => {
        inputModeMap.MOVE.value = inputModeMap.MOVE.value - 1 < 0 ? 1 : 0
      },
    },
    CIRCLE_SIZE: {
      value: 0,
      displayText: 'サイズ',
      up: () => {
        inputModeMap.CIRCLE_SIZE.value = p5.min(
          p5.width / 2,
          inputModeMap.CIRCLE_SIZE.value + STEP,
        )
      },
      down: () => {
        inputModeMap.CIRCLE_SIZE.value = p5.max(
          20,
          inputModeMap.CIRCLE_SIZE.value - STEP,
        )
      },
    },
    COLOR_SIZE: {
      value: 2,
      displayText: '色数',
      up: () => {
        inputModeMap.COLOR_SIZE.value =
          inputModeMap.COLOR_SIZE.value + 1 > 10
            ? 2
            : inputModeMap.COLOR_SIZE.value + 1
      },
      down: () => {
        inputModeMap.COLOR_SIZE.value =
          inputModeMap.COLOR_SIZE.value - 1 < 2
            ? 10
            : inputModeMap.COLOR_SIZE.value - 1
      },
    },
    RANGE: {
      value: 360,
      displayText: '色相レンジ',
      up: () => {
        inputModeMap.RANGE.value =
          inputModeMap.RANGE.value + STEP > 360
            ? 10
            : inputModeMap.RANGE.value + STEP
      },
      down: () => {
        inputModeMap.RANGE.value =
          inputModeMap.RANGE.value - STEP <= 0
            ? 360
            : inputModeMap.RANGE.value - STEP
      },
    },
    HUE: {
      value: 0,
      displayText: '色相',
      up: () => {
        inputModeMap.HUE.value = (inputModeMap.HUE.value + STEP) % 360
      },
      down: () => {
        inputModeMap.HUE.value =
          inputModeMap.HUE.value - STEP < 0
            ? 360
            : inputModeMap.HUE.value - STEP
      },
    },
    SATURATION: {
      value: 80,
      displayText: '彩度',
      up: () => {
        inputModeMap.SATURATION.value =
          (inputModeMap.SATURATION.value + STEP) % 100
      },
      down: () => {
        inputModeMap.SATURATION.value =
          inputModeMap.SATURATION.value - STEP < 0
            ? 100
            : inputModeMap.SATURATION.value - STEP
      },
    },
    BRIGHTNESS: {
      value: 80,
      displayText: '明るさ',
      up: () => {
        inputModeMap.BRIGHTNESS.value =
          (inputModeMap.BRIGHTNESS.value + STEP) % 100
      },
      down: () => {
        inputModeMap.BRIGHTNESS.value =
          inputModeMap.BRIGHTNESS.value - STEP < 0
            ? 100
            : inputModeMap.BRIGHTNESS.value - STEP
      },
    },
  }

  let hueList: number[]
  let circleMaxX: number
  let circleMaxY: number
  const circles1: circleType[][] = []
  let circles2: circleType[][] = []

  let mode: InputMode = InputModeList.at(0) as InputMode

  const displayMode: DisplayModeType = {
    start: 0,
    end: 0,
  }

  const setDisplayMode = () => {
    displayMode.start = p5.frameCount
    displayMode.end = displayMode.start + 60
  }

  const setupPattern = () => {
    const hueRange = p5.ceil(
      inputModeMap.RANGE.value / inputModeMap.COLOR_SIZE.value,
    )
    hueList = []
    for (let i = 0; i < inputModeMap.COLOR_SIZE.value; i++) {
      const value = inputModeMap.HUE.value + i * hueRange
      hueList.push(value % 360)
    }

    circleMaxX = Math.ceil(p5.width / inputModeMap.CIRCLE_SIZE.value) + 1
    circleMaxY = Math.ceil(p5.height / inputModeMap.CIRCLE_SIZE.value) + 1

    for (let x = 0; x < circleMaxX; x++) {
      for (let y = 0; y < circleMaxY; y++) {
        let hue: number

        if (!circles1[x]) {
          circles1[x] = []
        }
        while (true) {
          hue = p5.random(hueList)

          // 上・左が同じ色だったらやり直し
          if (x > 0) {
            if (circles1[x - 1][y].hue === hue) {
              continue
            }
          }
          if (y > 0) {
            if (circles1[x][y - 1].hue === hue) {
              continue
            }
          }
          break
        }

        circles1[x][y] = {
          x: x * inputModeMap.CIRCLE_SIZE.value,
          y: y * inputModeMap.CIRCLE_SIZE.value,
          hue,
        }
      }
    }

    circles2 = [...circles1]
  }

  const drawPattern = () => {
    drawBlock(p5, () => {
      p5.noStroke()

      let circle1Position: Vector
      if (inputModeMap.MOVE.value === 0) {
        circle1Position = p5.createVector(
          -(inputModeMap.CIRCLE_SIZE.value / 2),
          inputModeMap.CIRCLE_SIZE.value / 2,
        )
      } else {
        circle1Position = p5.createVector(
          inputModeMap.CIRCLE_SIZE.value / 2,
          inputModeMap.CIRCLE_SIZE.value / 2,
        )
      }

      // 円を並べる
      for (let x = 0; x < circleMaxX; x++) {
        for (let y = 0; y < circleMaxY; y++) {
          p5.fill(
            circles1[x][y].hue,
            inputModeMap.SATURATION.value,
            inputModeMap.BRIGHTNESS.value,
          )
          p5.ellipse(
            circles1[x][y].x + circle1Position.x,
            circles1[x][y].y + circle1Position.y,
            inputModeMap.CIRCLE_SIZE.value,
            inputModeMap.CIRCLE_SIZE.value,
          )
        }
      }
      for (let x = 0; x < circleMaxX; x++) {
        for (let y = 0; y < circleMaxY; y++) {
          p5.fill(
            circles2[x][y].hue,
            inputModeMap.SATURATION.value,
            inputModeMap.BRIGHTNESS.value,
          )
          p5.ellipse(
            circles2[x][y].x,
            circles2[x][y].y,
            inputModeMap.CIRCLE_SIZE.value,
            inputModeMap.CIRCLE_SIZE.value,
          )
        }
      }
    })
  }

  const displayModeText = () => {
    drawBlock(p5, () => {
      const progress = (p5.frameCount - displayMode.start) / 60
      const brightness = inputModeMap.BRIGHTNESS.value > 70 ? 0 : 100

      p5.fill(0, 0, brightness, 1 - progress)
      p5.textSize(30)
      p5.textAlign(p5.CENTER)
      p5.text(inputModeMap[mode].displayText, p5.width / 2, p5.height / 2 - 30)
      p5.text(inputModeMap[mode].value, p5.width / 2, p5.height / 2 + 30)
    })
  }

  p5.setup = () => {
    fitCreateCanvas(p5)
    p5.colorMode(p5.HSB)
    p5.background(95)

    inputModeMap.CIRCLE_SIZE.value = p5.min(50, p5.width / 10)

    setupPattern()
    drawPattern()
  }

  p5.keyPressed = () => {
    // 左右でモード切り替え
    if (p5.keyCode === KEY_CODE.RIGHT) {
      mode = InputModeList.at(
        (InputModeList.indexOf(mode) + 1) % InputModeList.length,
      ) as InputMode
    } else if (p5.keyCode === KEY_CODE.LEFT) {
      mode = InputModeList.at(
        (InputModeList.indexOf(mode) - 1 + InputModeList.length) %
          InputModeList.length,
      ) as InputMode
    }
    // 上 値を増やす
    else if (p5.keyCode === KEY_CODE.UP) {
      inputModeMap[mode].up()
      setupPattern()
      drawPattern()
    }
    // 下 値を減らす
    else if (p5.keyCode === KEY_CODE.DOWN) {
      inputModeMap[mode].down()
      setupPattern()
      drawPattern()
    }
    setDisplayMode()
  }

  p5.draw = () => {
    drawPattern()
    if (displayMode.start < p5.frameCount && p5.frameCount < displayMode.end) {
      displayModeText()
    }
  }
}

const index = () => {
  const { title, description } = pageInfo

  return (
    <DefaultSketch title={title} description={description} sketch={sketch} />
  )
}
export default index
