import DefaultPage from '@/components/pages/DefaultPage'
import { drawBlock, initSetup } from '@/lib/functions'
import { PageInfo } from '@/lib/types'
import type { P5CanvasInstance, Sketch } from '@p5-wrapper/react'
import { useSearchParams } from 'next/navigation'
import { Vector } from 'p5'

export const pageInfo: PageInfo = {
  title: 'midi信号を表示（launchpad mini mk3）',
  href: 'art/control/midi/launchpad-mini-mk3/display',
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
      const errorMessage = `inputが見つかりません`
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
      const errorMessage = `outputが見つかりません`
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

const calcDataGrid = (dataGrid: Key[][]): Map<number, number> => {
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
  return result
}

const sketch = (isFullScreen: boolean): Sketch => {
  return (p5: P5CanvasInstance) => {
    let canvasSize: Vector
    let centerPos: Vector
    let backgroundColor: { h: number; s: number; b: number }
    const dataGrid: Key[][] = []

    // 縦横の線の数
    let verticalLineCount: number
    let horizontalLineCount: number

    // 右斜・左斜の線の数
    let rightSlantLineCount: number
    let leftSlantLineCount: number

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
      verticalLineCount = 0
      horizontalLineCount = 0
      rightSlantLineCount = 0
      leftSlantLineCount = 0

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
        s: 20,
        b: 20,
      }

      p5.colorMode(p5.HSB)
      p5.frameRate(24)
      await midiSetup((i) => {
        setDataGridIsPressed(i, !getPressedKeyList(dataGrid).includes(i))

        // 背景色を変更する
        const calcDataGridResult = calcDataGrid(dataGrid)
        backgroundColor = {
          h: p5.map(calcDataGridResult.get(0) ?? 0, 0, 15, 0, 360),
          s: p5.map(calcDataGridResult.get(1) ?? 0, 0, 15, 20, 100),
          b: p5.map(calcDataGridResult.get(2) ?? 0, 0, 15, 20, 100),
        }

        verticalLineCount = p5.map(calcDataGridResult.get(3) ?? 0, 0, 15, 0, 20)
        horizontalLineCount = p5.map(
          calcDataGridResult.get(4) ?? 0,
          0,
          15,
          0,
          20,
        )
        rightSlantLineCount = p5.map(
          calcDataGridResult.get(5) ?? 0,
          0,
          15,
          0,
          20,
        )
        leftSlantLineCount = p5.map(
          calcDataGridResult.get(6) ?? 0,
          0,
          15,
          0,
          20,
        )
      }, dataGrid)
    })

    p5.setup = () => {
      canvasSize = setup(p5.createVector(0, 0))
    }
    // ----------
    // セットアップ
    // ----------

    // ----------
    // 描画
    // ----------
    const drawGrid = () => {
      drawBlock(p5, () => {
        p5.stroke(0)

        // グリッドの状態を表示
        const gridSize = 8
        const gridAreaWidth = p5.width / 10
        const gridWidth = gridAreaWidth / gridSize

        const gridPos = p5.createVector(
          centerPos.x - gridAreaWidth / 2,
          centerPos.y - gridAreaWidth / 2,
        )

        drawBlock(p5, () => {
          p5.fill(0, 0, 0)
          p5.rect(
            gridPos.x - 5,
            gridPos.y - 5,
            gridAreaWidth + 10,
            gridAreaWidth + 10,
          )
        })

        p5.strokeWeight(2)
        for (let row = 0; row < gridSize; row++) {
          for (let col = 0; col < gridSize; col++) {
            if (
              getPressedKeyList(dataGrid).includes(dataGrid[row][col].value)
            ) {
              p5.fill(200, 80, 100)
            } else {
              p5.fill(0, 0, 90)
            }
            p5.rect(
              col * gridWidth + gridPos.x,
              row * gridWidth + gridPos.y,
              gridWidth,
              gridWidth,
            )

            // グリッドの数字を表示
            // drawBlock(p5, () => {
            //   p5.noStroke()
            //   p5.fill(0, 0, 0)
            //   p5.textAlign(p5.CENTER, p5.CENTER)
            //   p5.textSize(gridWidth / 2)
            //   p5.text(
            //     `${dataGrid[row][col].value}`,
            //     col * gridWidth + gridPos.x + gridWidth / 2,
            //     row * gridWidth + gridPos.y + gridWidth / 2,
            //   )
            // })
          }
        }
      })
    }

    const drawVerticalLine = () => {
      drawBlock(p5, () => {
        // 縦の線を表示 (verticalLineCount)
        const lineSpace = p5.width / verticalLineCount
        for (let i = 0; i < verticalLineCount; i++) {
          const x = lineSpace * i
          p5.stroke(0, 0, 100)
          p5.line(x, 0, x, p5.height)
        }
      })
    }

    const drawHorizontalLine = () => {
      drawBlock(p5, () => {
        // 横の線を表示 (horizontalLineCount)
        const lineSpace = p5.height / horizontalLineCount
        for (let i = 0; i < horizontalLineCount; i++) {
          const y = lineSpace * i
          p5.stroke(0, 0, 100)
          p5.line(0, y, p5.width, y)
        }
      })
    }

    const drawRightSlantLine = () => {
      drawBlock(p5, () => {
        // 右斜の線を表示 (rightSlantLineCount)
        const lineSpace = p5.width / rightSlantLineCount
        for (let i = 0; i < rightSlantLineCount; i++) {
          const x = lineSpace * i
          p5.stroke(0, 0, 100)
          p5.line(x, 0, p5.width, p5.height - x)
        }
        for (let i = 0; i < rightSlantLineCount; i++) {
          const y = lineSpace * i
          p5.stroke(0, 0, 100)
          p5.line(0, y, p5.width - y, p5.height)
        }
      })
    }

    const drawLeftSlantLine = () => {
      drawBlock(p5, () => {
        // 左斜の線を表示 (leftSlantLineCount)
        for (let i = 0; i < leftSlantLineCount; i++) {
          const lineSpace = p5.width / leftSlantLineCount
          const x = lineSpace * i
          p5.stroke(0, 0, 100)
          p5.line(x, 0, 0, x)
        }
        for (let i = 0; i < leftSlantLineCount; i++) {
          const xLineSpace = p5.width / leftSlantLineCount
          const x = xLineSpace * i
          const yLineSpace = p5.height / leftSlantLineCount
          const y = yLineSpace * i
          p5.stroke(0, 0, 100)
          p5.line(p5.width, y, x, p5.height)
        }
      })
    }

    p5.draw = () => {
      canvasSize = setup(canvasSize)
      p5.background(backgroundColor.h, backgroundColor.s, backgroundColor.b)
      drawVerticalLine()
      drawHorizontalLine()
      drawRightSlantLine()
      drawLeftSlantLine()
      drawGrid()
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
