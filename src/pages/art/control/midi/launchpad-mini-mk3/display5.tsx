import DefaultPage from '@/components/pages/DefaultPage'
import { drawBlock, initSetup } from '@/lib/functions'
import type { PageInfo } from '@/lib/types'
import type { P5CanvasInstance, Sketch } from '@p5-wrapper/react'
import { useSearchParams } from 'next/navigation'
import type { Vector } from 'p5'

export const pageInfo: PageInfo = {
  title: 'midi信号を表示（launchpad mini mk3）5',
  href: 'art/control/midi/launchpad-mini-mk3/display5',
}

type ColorType = {
  _1: string
  _2: string
  _3: string
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

const _4thResult = (result: KeyProps) => {
  return {
    _1: result.key0 + result.key4 + result.key8 + result.key12,
    _2: result.key1 + result.key5 + result.key9 + result.key13,
    _3: result.key2 + result.key6 + result.key10 + result.key14,
    _4: result.key3 + result.key7 + result.key11 + result.key15,
  }
}

const drawEllipse = (p5: P5CanvasInstance, pos: Vector, width: number) => {
  p5.ellipse(pos.x, pos.y, width)
}

const drawEllipseSquare = (
  p5: P5CanvasInstance,
  pos: Vector,
  width: number,
) => {
  drawEllipse(
    p5,
    p5.createVector(pos.x - width / 3, pos.y - width / 3),
    width / 3,
  )
  drawEllipse(
    p5,
    p5.createVector(pos.x + width / 3, pos.y - width / 3),
    width / 3,
  )
  drawEllipse(
    p5,
    p5.createVector(pos.x - width / 3, pos.y + width / 3),
    width / 3,
  )
  drawEllipse(
    p5,
    p5.createVector(pos.x + width / 3, pos.y + width / 3),
    width / 3,
  )
}

const drawEllipseRhombus = (
  p5: P5CanvasInstance,
  pos: Vector,
  width: number,
) => {
  drawEllipse(p5, p5.createVector(pos.x - width / 3, pos.y), width / 3)

  drawEllipse(p5, p5.createVector(pos.x + width / 3, pos.y), width / 3)

  drawEllipse(p5, p5.createVector(pos.x, pos.y - width / 3), width / 3)

  drawEllipse(p5, p5.createVector(pos.x, pos.y + width / 3), width / 3)
}

const drawRect = (p5: P5CanvasInstance, pos: Vector, width: number) => {
  p5.rectMode(p5.CENTER)
  p5.rect(pos.x, pos.y, width)
}

const drawRectSquare = (p5: P5CanvasInstance, pos: Vector, width: number) => {
  drawRect(p5, p5.createVector(pos.x - width / 3, pos.y - width / 3), width / 3)
  drawRect(p5, p5.createVector(pos.x + width / 3, pos.y - width / 3), width / 3)
  drawRect(p5, p5.createVector(pos.x - width / 3, pos.y + width / 3), width / 3)
  drawRect(p5, p5.createVector(pos.x + width / 3, pos.y + width / 3), width / 3)
}

const drawRectRhombus = (p5: P5CanvasInstance, pos: Vector, width: number) => {
  drawRect(p5, p5.createVector(pos.x - width / 3, pos.y), width / 3)

  drawRect(p5, p5.createVector(pos.x + width / 3, pos.y), width / 3)

  drawRect(p5, p5.createVector(pos.x, pos.y - width / 3), width / 3)

  drawRect(p5, p5.createVector(pos.x, pos.y + width / 3), width / 3)
}

// ひし形
const drawRhombus = (p5: P5CanvasInstance, pos: Vector, width: number) => {
  p5.beginShape()
  p5.vertex(pos.x, pos.y - width)
  p5.vertex(pos.x + width, pos.y)
  p5.vertex(pos.x, pos.y + width)
  p5.vertex(pos.x - width, pos.y)
  p5.endShape(p5.CLOSE)
}

const drawRhombusSquare = (
  p5: P5CanvasInstance,
  pos: Vector,
  width: number,
) => {
  drawRhombus(
    p5,
    p5.createVector(pos.x - width / 3, pos.y - width / 3),
    width / 3,
  )
  drawRhombus(
    p5,
    p5.createVector(pos.x + width / 3, pos.y - width / 3),
    width / 3,
  )
  drawRhombus(
    p5,
    p5.createVector(pos.x - width / 3, pos.y + width / 3),
    width / 3,
  )
  drawRhombus(
    p5,
    p5.createVector(pos.x + width / 3, pos.y + width / 3),
    width / 3,
  )
}

const drawRhombusRhombus = (
  p5: P5CanvasInstance,
  pos: Vector,
  width: number,
) => {
  drawRhombus(p5, p5.createVector(pos.x - width / 3, pos.y), width / 3)

  drawRhombus(p5, p5.createVector(pos.x + width / 3, pos.y), width / 3)

  drawRhombus(p5, p5.createVector(pos.x, pos.y - width / 3), width / 3)

  drawRhombus(p5, p5.createVector(pos.x, pos.y + width / 3), width / 3)
}

const funcArray = (
  p5: P5CanvasInstance,
  pos: Vector,
  width: number,
  rate: number,
  isFill: boolean,
): (() => void)[] => {
  const { x, y } = pos
  const leftTopPos = p5.createVector(x * width, y * width)
  const centerPos = p5.createVector(
    x * width + width / 2,
    y * width + width / 2,
  )

  const result: (() => void)[] = []

  if (isFill) {
    for (const func of [
      // 円系
      () => {
        drawEllipse(p5, centerPos, width * rate)
      },
      () => {
        // ずらした円1
        if ((y % 2 === 0 && x % 2 === 1) || (y % 2 === 1 && x % 2 === 0)) {
          drawEllipse(p5, centerPos, width * rate)
        }
      },
      () => {
        // ずらした円2
        if ((y % 2 === 0 && x % 2 === 0) || (y % 2 === 1 && x % 2 === 1)) {
          drawEllipse(p5, centerPos, width * rate)
        }
      },
      () => {
        // 四隅に円
        drawEllipseSquare(p5, centerPos, width)
      },
      () => {
        //四隅に円（ずらした）1
        if ((y % 2 === 0 && x % 2 === 1) || (y % 2 === 1 && x % 2 === 0)) {
          drawEllipseSquare(p5, centerPos, width)
        }
      },
      () => {
        //四隅に円（ずらした）2
        if ((y % 2 === 0 && x % 2 === 0) || (y % 2 === 1 && x % 2 === 1)) {
          drawEllipseSquare(p5, centerPos, width)
        }
      },
      () => {
        // ひし形に円を配置（4つ）
        drawEllipseRhombus(p5, centerPos, width)
      },
      () => {
        // ひし形に円を配置（4つ）（ずらした）1
        if ((y % 2 === 0 && x % 2 === 1) || (y % 2 === 1 && x % 2 === 0)) {
          drawEllipseRhombus(p5, centerPos, width)
        }
      },
      () => {
        // ひし形に円を配置（4つ）（ずらした）2
        if ((y % 2 === 0 && x % 2 === 0) || (y % 2 === 1 && x % 2 === 1)) {
          drawEllipseRhombus(p5, centerPos, width)
        }
      },
      // 四角系
      () => {
        // 四角
        drawRect(p5, centerPos, width * rate)
      },
      () => {
        // ずらした四角1
        if ((y % 2 === 0 && x % 2 === 1) || (y % 2 === 1 && x % 2 === 0)) {
          drawRect(p5, centerPos, width * rate)
        }
      },
      () => {
        // ずらした四角2
        if ((y % 2 === 0 && x % 2 === 0) || (y % 2 === 1 && x % 2 === 1)) {
          drawRect(p5, centerPos, width * rate)
        }
      },
      () => {
        // 四隅に四角
        drawRectSquare(p5, centerPos, width)
      },
      () => {
        // 四隅に四角（ずらした）1
        if ((y % 2 === 0 && x % 2 === 1) || (y % 2 === 1 && x % 2 === 0)) {
          drawRectSquare(p5, centerPos, width)
        }
      },
      () => {
        // 四隅に四角（ずらした）2
        if ((y % 2 === 0 && x % 2 === 0) || (y % 2 === 1 && x % 2 === 1)) {
          drawRectSquare(p5, centerPos, width)
        }
      },
      () => {
        // ひし形に四角を配置（4つ）
        drawRectRhombus(p5, centerPos, width)
      },
      () => {
        // ひし形に四角を配置（4つ）（ずらした）1
        if ((y % 2 === 0 && x % 2 === 1) || (y % 2 === 1 && x % 2 === 0)) {
          drawRectRhombus(p5, centerPos, width)
        }
      },
      () => {
        // ひし形に四角を配置（4つ）（ずらした）2
        if ((y % 2 === 0 && x % 2 === 0) || (y % 2 === 1 && x % 2 === 1)) {
          drawRectRhombus(p5, centerPos, width)
        }
      },
      // ひし形
      () => {
        drawRhombus(p5, centerPos, (width / 2) * rate)
      },
      () => {
        // ずらしたひし形1
        if ((y % 2 === 0 && x % 2 === 1) || (y % 2 === 1 && x % 2 === 0)) {
          drawRhombus(p5, centerPos, (width / 2) * rate)
        }
      },
      () => {
        // ずらしたひし形2
        if ((y % 2 === 0 && x % 2 === 0) || (y % 2 === 1 && x % 2 === 1)) {
          drawRhombus(p5, centerPos, (width / 2) * rate)
        }
      },
      () => {
        // 四隅にひし形
        drawRhombusSquare(p5, centerPos, width)
      },
      () => {
        // 四隅にひし形（ずらした）1
        if ((y % 2 === 0 && x % 2 === 1) || (y % 2 === 1 && x % 2 === 0)) {
          drawRhombusSquare(p5, centerPos, width)
        }
      },
      () => {
        // 四隅にひし形（ずらした）2
        if ((y % 2 === 0 && x % 2 === 0) || (y % 2 === 1 && x % 2 === 1)) {
          drawRhombusSquare(p5, centerPos, width)
        }
      },
      () => {
        // ひし形にひし形を配置（4つ）
        drawRhombusRhombus(p5, centerPos, width)
      },
      () => {
        // ひし形にひし形を配置（4つ）（ずらした）1
        if ((y % 2 === 0 && x % 2 === 1) || (y % 2 === 1 && x % 2 === 0)) {
          drawRhombusRhombus(p5, centerPos, width)
        }
      },
      () => {
        // ひし形にひし形を配置（4つ）（ずらした）2
        if ((y % 2 === 0 && x % 2 === 0) || (y % 2 === 1 && x % 2 === 1)) {
          drawRhombusRhombus(p5, centerPos, width)
        }
      },
    ]) {
      result.push(func)
    }
  }

  if (!isFill) {
    for (const func of [
      // 線形
      () => {
        // バッテン
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
        p5.line(leftTopPos.x, leftTopPos.y, leftTopPos.x, leftTopPos.y + width)
        // 左下から右下
        p5.line(
          leftTopPos.x,
          leftTopPos.y + width,
          leftTopPos.x + width,
          leftTopPos.y + width,
        )
      },
    ]) {
      result.push(func)
    }
  }

  return result
}

const drawShape = (
  p5: P5CanvasInstance,
  value: number,
  shapeCount: number,
  rate: number,
  color: string,
  isFill: boolean,
) => {
  if (value === 0) {
    return
  }

  const _count = p5.ceil(shapeCount)
  const width = p5.width / _count
  const count = p5.createVector(_count, p5.height / width)

  const loopFunc = (pos: Vector) => {
    const _funcArray = funcArray(p5, pos, width, rate, isFill)
    const func = _funcArray.at(value % _funcArray.length)
    if (!func) {
      return
    }
    drawBlock(p5, func)
  }

  drawBlock(p5, () => {
    if (isFill) {
      p5.noStroke()
      p5.fill(color)
    } else {
      p5.noFill()
      p5.stroke(color)
      p5.strokeWeight(width / 20)
    }

    for (let x = 0; x < count.x; x++) {
      for (let y = 0; y < count.y; y++) {
        loopFunc(p5.createVector(x, y))
      }
    }
  })
}

const colorArray = (): ColorType[] => {
  return [
    {
      _1: '#ffffff',
      _2: '#000000',
      _3: '#aaaaaa',
    },
    ...[
      {
        _1: '#dff2fc',
        _2: '#504c94',
        _3: '#3c73a8',
      },
      {
        _1: '#f9cfcf',
        _2: '#f5b19b',
        _3: '#c95784',
      },
      {
        _1: '#fff2ad',
        _2: '#5391c8',
        _3: '#0f1d3e',
      },
      {
        _1: '#b1585b',
        _2: '#88513e',
        _3: '#34455c',
      },
      {
        _1: '#ea903a',
        _2: '#e99aad',
        _3: '#7faf7b',
      },
      {
        _1: '#ffeb00',
        _2: '#64c2c5',
        _3: '#00629b',
      },
      {
        _1: '#fcd475',
        _2: '#7ec2b2',
        _3: '#2f9da3',
      },
      // {
      //   _1: '#000',
      //   _2: '#000',
      //   _3: '#000',
      // },
    ],
    // {
    //   _1: '#000000',
    //   _2: '#ffffff',
    //   _3: '#aaaaaa',
    // },
  ]
}

const sketch = (isFullScreen: boolean): Sketch => {
  return (p5: P5CanvasInstance) => {
    let canvasSize: Vector
    let centerPos: Vector
    const dataGrid: Key[][] = []

    let color: ColorType

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
      p5.colorMode(p5.RGB)

      // データグリッドの初期化
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
      color = {
        _1: '#ffffff',
        _2: '#000000',
        _3: '#aaaaaa',
      }

      p5.colorMode(p5.HSB)
      p5.frameRate(24)
      await midiSetup((i) => {
        setDataGridIsPressed(i, !getPressedKeyList(dataGrid).includes(i))

        // 背景色を変更する
        calcDataGridResult = calcDataGrid(dataGrid)
        const resultData = _4thResult(calcDataGridResult)
        const _colorArray = colorArray()
        const _color = _colorArray.at(resultData._1 % _colorArray.length)
        if (!_color) {
          return
        }
        color = _color
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
      p5.background(color._1)

      const resultData = _4thResult(calcDataGridResult)

      // fill - color2
      drawShape(p5, p5.ceil(resultData._2), 20, 0.95, color._2, true)

      // no fill - color1
      drawShape(p5, p5.ceil(resultData._3), 20, 0.8, color._1, false)

      // no fill - color3
      drawShape(p5, p5.ceil(resultData._4), 20, 0.3, color._3, true)

      // // no fill - white
      // drawShape(
      //   p5,
      //   p5.ceil(resultData._4),
      //   20,
      //   0.85,
      //   { h: 0, s: 0, b: 100 },
      //   false,
      // )
      //
      // // no fill - black
      // drawShape(
      //   p5,
      //   p5.ceil(resultData._3),
      //   20,
      //   0.85,
      //   { h: 0, s: 0, b: 0 },
      //   false,
      // )
      //
      // // no fill - background color
      // drawShape(
      //   p5,
      //   p5.ceil(resultData._2),
      //   20,
      //   0.85,
      //   {
      //     h: backgroundColor.h,
      //     s: 40,
      //     b: 40,
      //   },
      //   false,
      // )
    }
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
