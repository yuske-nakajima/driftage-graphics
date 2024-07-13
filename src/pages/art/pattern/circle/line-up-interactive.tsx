import DefaultSketch from '@/components/pages/DefaultSketch'
import { KEY_CODE } from '@/lib/constants'
import { drawBlock, fitCreateCanvas } from '@/lib/functions'
import { PageInfo } from '@/lib/types'
import type { P5CanvasInstance, Sketch } from '@p5-wrapper/react'
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
  'CIRCLE_SIZE',
  'COLOR_SIZE',
  'HUE',
  'SATURATION',
  'BRIGHTNESS',
]

type InputMode = (typeof InputModeList)[number]

type DisplayModeType = {
  start: number
  end: number
}

const sketch: Sketch = (p5) => {
  let hue: number
  let saturation: number = 80
  let brightness: number = 80

  let colorSize: number
  let hueList: number[]

  let circleSize: number

  let circleMaxX: number
  let circleMaxY: number
  const circles1: circleType[][] = []
  let circles2: circleType[][] = []

  let mode: InputMode = InputModeList.at(0) as InputMode

  let displayMode: DisplayModeType = {
    start: 0,
    end: 0,
  }

  const setDisplayMode = (p5: P5CanvasInstance) => {
    displayMode.start = p5.frameCount
    displayMode.end = displayMode.start + 60
  }

  const setupPattern = () => {
    const hueRange = p5.ceil(360 / colorSize)
    hueList = []
    for (let i = hue; i < 720; i += hueRange) {
      hueList.push(i % 360)
    }

    circleMaxX = Math.ceil(p5.width / circleSize) + 1
    circleMaxY = Math.ceil(p5.height / circleSize) + 1

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
          if (x > 1 && y > 0) {
            if (circles1[x - 2][y - 1].hue === hue) {
              continue
            }
          }
          break
        }

        circles1[x][y] = {
          x: x * circleSize,
          y: y * circleSize,
          hue,
        }
      }
    }

    circles2 = [...circles1]
  }

  const drawPattern = (p5: P5CanvasInstance) => {
    drawBlock(p5, () => {
      p5.noStroke()

      let circle1Position: Vector = p5.createVector(
        -(circleSize / 2),
        circleSize / 2,
      )
      // if (p5.random(1) < 0.5) {
      //   circle1Position = p5.createVector(-(circleSize / 2), circleSize / 2)
      // } else {
      //   circle1Position = p5.createVector(circleSize / 2, circleSize / 2)
      // }

      // 円を並べる
      for (let x = 0; x < circleMaxX; x++) {
        for (let y = 0; y < circleMaxY; y++) {
          p5.fill(circles1[x][y].hue, saturation, brightness)
          p5.ellipse(
            circles1[x][y].x + circle1Position.x,
            circles1[x][y].y + circle1Position.y,
            circleSize,
            circleSize,
          )
        }
      }
      for (let x = 0; x < circleMaxX; x++) {
        for (let y = 0; y < circleMaxY; y++) {
          p5.fill(circles2[x][y].hue, saturation, brightness)
          p5.ellipse(circles2[x][y].x, circles2[x][y].y, circleSize, circleSize)
        }
      }
    })
  }

  p5.setup = () => {
    fitCreateCanvas(p5)
    p5.colorMode(p5.HSB)
    p5.background(95)

    hue = 0
    colorSize = 10
    circleSize = p5.min(50, p5.width / 10)

    setupPattern()
    drawPattern(p5)
  }

  p5.keyPressed = () => {
    // 左右でモード切り替え
    if (p5.keyCode === KEY_CODE.RIGHT) {
      mode = InputModeList.at(
        (InputModeList.indexOf(mode) + 1) % InputModeList.length,
      ) as InputMode
      setDisplayMode(p5)
    } else if (p5.keyCode === KEY_CODE.LEFT) {
      mode = InputModeList.at(
        (InputModeList.indexOf(mode) - 1 + InputModeList.length) %
          InputModeList.length,
      ) as InputMode
      setDisplayMode(p5)
    }
    // 上
    else if (p5.keyCode === KEY_CODE.UP) {
      if (mode === 'CIRCLE_SIZE') {
        circleSize = p5.min(p5.width / 2, circleSize + 10)
      } else if (mode === 'COLOR_SIZE') {
        colorSize = p5.min(60, colorSize + 1)
      } else if (mode === 'HUE') {
        hue = (hue + 5) % 360
      } else if (mode === 'SATURATION') {
        saturation = (saturation + 5) % 100
      } else if (mode === 'BRIGHTNESS') {
        brightness = (brightness + 5) % 100
      }

      setupPattern()
      drawPattern(p5)
      setDisplayMode(p5)
    }
    // 下
    else if (p5.keyCode === KEY_CODE.DOWN) {
      if (mode === 'CIRCLE_SIZE') {
        circleSize = p5.max(20, circleSize - 10)
      } else if (mode === 'COLOR_SIZE') {
        colorSize = p5.max(2, colorSize - 1)
      } else if (mode === 'HUE') {
        hue = (hue - 5) % 360 < 0 ? 360 : hue - 5
      } else if (mode === 'SATURATION') {
        saturation = (saturation - 5) % 100 < 0 ? 100 : saturation - 5
      } else if (mode === 'BRIGHTNESS') {
        brightness = (brightness - 5) % 100 < 0 ? 100 : brightness - 5
      }

      setupPattern()
      drawPattern(p5)
      setDisplayMode(p5)
    }
  }

  p5.draw = () => {
    drawPattern(p5)
    if (displayMode.start < p5.frameCount && p5.frameCount < displayMode.end) {
      drawBlock(p5, () => {
        let displayModeText = ''
        let valueText = ''

        if (mode === 'CIRCLE_SIZE') {
          displayModeText = '円の大きさ'
          valueText = `${circleSize}`
        } else if (mode === 'COLOR_SIZE') {
          displayModeText = '色数'
          valueText = `${colorSize}`
        } else if (mode === 'HUE') {
          displayModeText = '色相'
          valueText = `${hue}`
        } else if (mode === 'SATURATION') {
          displayModeText = '彩度'
          valueText = `${saturation}`
        } else if (mode === 'BRIGHTNESS') {
          displayModeText = '明度'
          valueText = `${brightness}`
        }

        p5.fill(0, 0, 100)
        p5.textSize(30)
        p5.textAlign(p5.CENTER)
        p5.text(displayModeText, p5.width / 2, p5.height / 2 - 30)
        p5.text(valueText, p5.width / 2, p5.height / 2 + 30)
      })
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
