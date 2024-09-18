import DefaultPage from '@/components/pages/DefaultPage'
import { drawBlock, initSetup } from '@/lib/functions'
import type { PageInfo } from '@/lib/types'
import type { P5CanvasInstance, Sketch } from '@p5-wrapper/react'
import { useSearchParams } from 'next/navigation'
import type { Vector } from 'p5'

export const pageInfo: PageInfo = {
  title: 'midi信号を表示（launchpad mini mk3）3',
  href: 'art/control/midi/launchpad-mini-mk3/display3',
}

type HsbType = {
  h: number
  s: number
  b: number
}

type KeyProps = {
  key0: number
  key1: number
  key2: number
  key3: number
  key4: number
  key5: number
  key6: number
  key7: number
  key8: number
  key9: number
  key10: number
  key11: number
  key12: number
  key13: number
  key14: number
  key15: number
}

const GRID_SIZE = 8

type Key = {
  value: number
  calcValue: number
  group: number
  isPressed: boolean
}

const isPressed = (data: number) => {
  return data === 127
}

const getPressedKeyList = (dataGrid: Key[][]): number[] => {
  const result: number[] = []
  for (const row of dataGrid) {
    for (const col of row) {
      if (col.isPressed) {
        result.push(col.value)
      }
    }
  }
  return result
}

const midiSetup = async (
  pressedCallback: (i: number) => void,
  dataGrid: Key[][],
) => {
  try {
    const access = await navigator.requestMIDIAccess()

    const input = Array.from(access.inputs.values())
      .filter((input) => {
        return (
          input.name === 'Launchpad Mini MK3 LPMiniMK3 MIDI Out' || // mac
          input.name === 'MIDIIN2 (LPMiniMK3 MIDI)' // windows
        )
      })
      .at(0)
    if (!input) {
      const errorMessage = 'inputが見つかりません'
      console.error(errorMessage)
      return errorMessage
    }

    const output = Array.from(access.outputs.values())
      .filter((output) => {
        return (
          output.name === 'Launchpad Mini MK3 LPMiniMK3 MIDI In' || // mac
          output.name === 'MIDIOUT2 (LPMiniMK3 MIDI)' // windows
        )
      })
      .at(0)
    if (!output) {
      const errorMessage = 'outputが見つかりません'
      console.error(errorMessage)
      return errorMessage
    }

    for (let i = 36; i <= 99; i++) {
      output.send([0x90, i, 0])
    }

    input.onmidimessage = (event: WebMidi.MIDIMessageEvent) => {
      const status = event.data.at(0)
      const note = event.data.at(1)
      const velocity = event.data.at(2)

      // 有効なデータのみ処理する
      if (!status || !note || !velocity) {
        return
      }

      for (let i = 36; i <= 99; i++) {
        if (note !== i) {
          continue
        }

        if (isPressed(velocity)) {
          pressedCallback(note)
        }

        if (getPressedKeyList(dataGrid).includes(i)) {
          output.send([0x90, i, 41 /* 色コード */])
        } else {
          output.send([0x90, i, 0])
        }
      }
    }
  } catch (e) {
    const errorMessage = `MIDIデバイスの接続に失敗しました: ${e}`
    console.error(errorMessage)
    return errorMessage
  }
}

const calcDataGrid = (dataGrid: Key[][]): KeyProps => {
  const result = new Map<number, number>()
  for (let i = 0; i < dataGrid.length * 2; i++) {
    result.set(i, 0)
  }
  for (const item of dataGrid.flat()) {
    const nowValue = result.get(item.group)
    if (item.isPressed && nowValue !== undefined) {
      result.set(item.group, nowValue + item.calcValue)
    }
  }

  return {
    key0: result.get(0) ?? 0,
    key1: result.get(1) ?? 0,
    key2: result.get(2) ?? 0,
    key3: result.get(3) ?? 0,
    key4: result.get(4) ?? 0,
    key5: result.get(5) ?? 0,
    key6: result.get(6) ?? 0,
    key7: result.get(7) ?? 0,
    key8: result.get(8) ?? 0,
    key9: result.get(9) ?? 0,
    key10: result.get(10) ?? 0,
    key11: result.get(11) ?? 0,
    key12: result.get(12) ?? 0,
    key13: result.get(13) ?? 0,
    key14: result.get(14) ?? 0,
    key15: result.get(15) ?? 0,
  }
}

// const sumResult = (result: KeyProps) => {
//   return (
//     result.key0 +
//     result.key1 +
//     result.key2 +
//     result.key3 +
//     result.key4 +
//     result.key5 +
//     result.key6 +
//     result.key7 +
//     result.key8 +
//     result.key9 +
//     result.key10 +
//     result.key11 +
//     result.key12 +
//     result.key13 +
//     result.key14 +
//     result.key15
//   )
// }

// const halfResult = (result: KeyProps) => {
//   return {
//     _1:
//       result.key0 +
//       result.key2 +
//       result.key4 +
//       result.key6 +
//       result.key8 +
//       result.key10 +
//       result.key12 +
//       result.key14,
//
//     _2:
//       result.key1 +
//       result.key3 +
//       result.key5 +
//       result.key7 +
//       result.key9 +
//       result.key11 +
//       result.key13 +
//       result.key15,
//   }
// }

const _3rdResult = (result: KeyProps) => {
  return {
    _1:
      result.key0 +
      result.key3 +
      result.key6 +
      result.key9 +
      result.key12 +
      result.key15,
    _2: result.key1 + result.key4 + result.key7 + result.key10 + result.key13,
    _3: result.key2 + result.key5 + result.key8 + result.key11 + result.key14,
  }
}

const drawEllipse = (p5: P5CanvasInstance, pos: Vector, width: number) => {
  p5.ellipse(pos.x, pos.y, width)
}

const drawRect = (p5: P5CanvasInstance, pos: Vector, width: number) => {
  p5.rectMode(p5.CENTER)
  p5.rect(pos.x, pos.y, width)
}

const noFill = (p5: P5CanvasInstance, width: number, color: HsbType) => {
  p5.noFill()
  p5.stroke(color.h, color.s, color.b)
  p5.strokeWeight(width / 20)
}

const funcArray = (
  p5: P5CanvasInstance,
  pos: Vector,
  width: number,
  rate: number,
  color: HsbType,
): (() => void)[] => {
  const { x, y } = pos
  const leftTopPos = p5.createVector(x * width, y * width)
  const centerPos = p5.createVector(
    x * width + width / 2,
    y * width + width / 2,
  )

  return [
    // 線形
    () => {
      // 左上から右下
      noFill(p5, width, color)
      p5.line(
        leftTopPos.x,
        leftTopPos.y,
        leftTopPos.x + width,
        leftTopPos.y + width,
      )
    },
    () => {
      // 右上から左下
      noFill(p5, width, color)
      p5.line(
        leftTopPos.x + width,
        leftTopPos.y,
        leftTopPos.x,
        leftTopPos.y + width,
      )
    },
    () => {
      // バッテン
      noFill(p5, width, color)
      p5.line(
        leftTopPos.x + width,
        leftTopPos.y,
        leftTopPos.x,
        leftTopPos.y + width,
      )
      p5.line(
        leftTopPos.x,
        leftTopPos.y,
        leftTopPos.x + width,
        leftTopPos.y + width,
      )
    },
    () => {
      // 左上から左下
      noFill(p5, width, color)
      p5.line(leftTopPos.x, leftTopPos.y, leftTopPos.x, leftTopPos.y + width)
      // 左下から右下
      p5.line(
        leftTopPos.x,
        leftTopPos.y + width,
        leftTopPos.x + width,
        leftTopPos.y + width,
      )
    },
    // 円系
    () => {
      // 円
      drawEllipse(p5, centerPos, width * rate)
    },
    () => {
      // ずらした円
      if ((y % 2 === 0 && x % 2 === 1) || (y % 2 === 1 && x % 2 === 0)) {
        drawEllipse(p5, centerPos, width * rate)
      }
    },
    () => {
      // 四隅に円
      drawEllipse(
        p5,
        p5.createVector(centerPos.x - width / 3, centerPos.y - width / 3),
        width / 3,
      )
      drawEllipse(
        p5,
        p5.createVector(centerPos.x + width / 3, centerPos.y - width / 3),
        width / 3,
      )
      drawEllipse(
        p5,
        p5.createVector(centerPos.x - width / 3, centerPos.y + width / 3),
        width / 3,
      )
      drawEllipse(
        p5,
        p5.createVector(centerPos.x + width / 3, centerPos.y + width / 3),
        width / 3,
      )
    },
    // 四角系
    () => {
      // 四角
      drawRect(p5, centerPos, width * rate)
    },
    () => {
      // ずらした四角
      if ((y % 2 === 0 && x % 2 === 1) || (y % 2 === 1 && x % 2 === 0)) {
        drawRect(p5, centerPos, width * rate)
      }
    },
    () => {
      // 四隅に四角
      drawRect(
        p5,
        p5.createVector(centerPos.x - width / 3, centerPos.y - width / 3),
        width / 3,
      )
      drawRect(
        p5,
        p5.createVector(centerPos.x + width / 3, centerPos.y - width / 3),
        width / 3,
      )
      drawRect(
        p5,
        p5.createVector(centerPos.x - width / 3, centerPos.y + width / 3),
        width / 3,
      )
      drawRect(
        p5,
        p5.createVector(centerPos.x + width / 3, centerPos.y + width / 3),
        width / 3,
      )
    },
    // ひし形
    () => {
      p5.beginShape()
      p5.vertex(centerPos.x, centerPos.y - (width / 2) * rate)
      p5.vertex(centerPos.x + (width / 2) * rate, centerPos.y)
      p5.vertex(centerPos.x, centerPos.y + (width / 2) * rate)
      p5.vertex(centerPos.x - (width / 2) * rate, centerPos.y)
      p5.endShape(p5.CLOSE)
    },
  ]
}

const drawShape = (
  p5: P5CanvasInstance,
  value: number,
  shapeCount: number,
  rate: number,
  secondColor: HsbType,
  isFill = true,
) => {
  if (value === 0) {
    return
  }

  const _count = p5.ceil(shapeCount)
  const width = p5.width / _count
  const count = p5.createVector(_count, p5.height / width)

  const loopFunc = (pos: Vector) => {
    const _funcArray = funcArray(p5, pos, width, rate, secondColor)
    const func = _funcArray.at(value % _funcArray.length)
    if (!func) {
      return
    }
    drawBlock(p5, func)
  }

  drawBlock(p5, () => {
    for (let x = 0; x < count.x; x++) {
      for (let y = 0; y < count.y; y++) {
        if (isFill) {
          p5.fill(secondColor.h, secondColor.s, secondColor.b)
        } else {
          p5.stroke(secondColor.h, secondColor.s, secondColor.b)
          noFill(p5, width, secondColor)
        }
        loopFunc(p5.createVector(x, y))
      }
    }
  })
}

const sketch = (isFullScreen: boolean): Sketch => {
  return (p5: P5CanvasInstance) => {
    let canvasSize: Vector
    let centerPos: Vector
    let backgroundColor: HsbType
    const dataGrid: Key[][] = []

    let calcDataGridResult: KeyProps = {
      key0: 0,
      key1: 0,
      key2: 0,
      key3: 0,
      key4: 0,
      key5: 0,
      key6: 0,
      key7: 0,
      key8: 0,
      key9: 0,
      key10: 0,
      key11: 0,
      key12: 0,
      key13: 0,
      key14: 0,
      key15: 0,
    }

    const setDataGridIsPressed = (value: number, isPressed: boolean) => {
      for (let row = 0; row < dataGrid.length; row++) {
        for (let col = 0; col < dataGrid.length; col++) {
          if (dataGrid[row][col].value === value) {
            dataGrid[row][col].isPressed = isPressed
          }
        }
      }
    }

    // ----------
    // セットアップ
    // ----------
    const setup = initSetup(p5, isFullScreen, async () => {
      for (let row = 0; row < GRID_SIZE; row++) {
        const gridHalf = GRID_SIZE / 2
        const r: Key[] = []
        for (let col = 0; col < GRID_SIZE; col++) {
          let value = 36 + row * gridHalf + col
          const calcValue = [8, 4, 2, 1][(value - 36) % 4]
          let group = row
          const isPressed = false
          if (col >= gridHalf) {
            value += 28
            group += 8
          }
          r.push({ value, calcValue, group, isPressed })
        }
        dataGrid.unshift(r)
      }

      centerPos = p5.createVector(p5.width / 2, p5.height / 2)
      backgroundColor = {
        h: 0,
        s: 80,
        b: 80,
      }

      p5.colorMode(p5.HSB)
      p5.frameRate(24)
      await midiSetup((i) => {
        setDataGridIsPressed(i, !getPressedKeyList(dataGrid).includes(i))

        // 背景色を変更する
        calcDataGridResult = calcDataGrid(dataGrid)
        const _3rd = _3rdResult(calcDataGridResult)
        backgroundColor = {
          h: p5.map(_3rd._1, 0, 90, 0, 360),
          s: p5.map(_3rd._2, 0, 75, 80, 100),
          b: p5.map(_3rd._3, 0, 75, 80, 100),
        }
      }, dataGrid)
    })

    p5.setup = () => {
      canvasSize = setup(p5.createVector(0, 0))
    }
    // ----------
    // セットアップ
    // ----------

    p5.draw = () => {
      canvasSize = setup(canvasSize)
      p5.background(backgroundColor.h, backgroundColor.s, backgroundColor.b)

      const resultData = _3rdResult(calcDataGridResult)

      // fill
      drawShape(p5, p5.ceil(resultData._1), 20, 0.95, { h: 0, s: 0, b: 0 })

      // no fill - background color
      drawShape(p5, p5.ceil(resultData._2), 20, 0.85, backgroundColor, false)

      // no fill - white
      drawShape(
        p5,
        p5.ceil(resultData._3),
        20,
        0.85,
        { h: 0, s: 0, b: 100 },
        false,
      )
    }
    // ----------
    // 描画
    // ----------
  }
}

const index = () => {
  const { title } = pageInfo
  const searchParams = useSearchParams()
  const isFullScreen = searchParams.get('full-screen') === 'true'

  return (
    <DefaultPage
      title={title}
      sketch={sketch(isFullScreen)}
      isFullScreen={isFullScreen}
    />
  )
}
export default index
