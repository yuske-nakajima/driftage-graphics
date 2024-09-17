import DefaultPage from '@/components/pages/DefaultPage'
import { drawBlock, initSetup } from '@/lib/functions'
import type { PageInfo } from '@/lib/types'
import type { P5CanvasInstance, Sketch } from '@p5-wrapper/react'
import { useSearchParams } from 'next/navigation'
import type { Vector } from 'p5'

export const pageInfo: PageInfo = {
  title: 'midi信号を表示（launchpad mini mk3）2',
  href: 'art/control/midi/launchpad-mini-mk3/display2',
}

type KeyProps = {
  hue: number
  shapeCount: number
  shapeCategory: number
  shapeCategoryRate: number
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
    hue: result.get(0) ?? 0,
    shapeCount: result.get(1) ?? 0,
    shapeCategory: result.get(2) ?? 0,
    shapeCategoryRate: result.get(3) ?? 0,
    key4: result.get(1) ?? 0,
    key5: result.get(2) ?? 0,
    key6: result.get(4) ?? 0,
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

const sketch = (isFullScreen: boolean): Sketch => {
  return (p5: P5CanvasInstance) => {
    let canvasSize: Vector
    let centerPos: Vector
    let backgroundColor: { h: number; s: number; b: number }
    const dataGrid: Key[][] = []

    let calcDataGridResult: KeyProps = {
      hue: 0,
      shapeCount: 0,
      shapeCategory: 0,
      shapeCategoryRate: 0,
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
        backgroundColor = {
          h: p5.map(calcDataGridResult.hue, 0, 15, 0, 360),
          s: 80,
          b: 80,
        }
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

    // 形を描画
    const drawCircle = (value: number, shapeCount: number, rate: number) => {
      drawBlock(p5, () => {
        const _count = p5.ceil(shapeCount)
        const width = p5.width / _count
        const count = p5.createVector(_count, p5.height / width)
        const strokeWeight = width / 20

        const loopFunc = (x: number, y: number) => {
          const centerPos = p5.createVector(
            x * width + width / 2,
            y * width + width / 2,
          )

          // 塗りつぶし
          const fill = () => {
            p5.fill(0, 0, 100)
            p5.noStroke()
          }

          const noFill = () => {
            p5.noFill()
            p5.stroke(0, 0, 100)
            p5.strokeWeight(strokeWeight)
          }

          const _drawEllipse = () => {
            p5.ellipse(centerPos.x, centerPos.y, width * rate)
          }

          const _drawRect = () => {
            p5.rectMode(p5.CENTER)
            p5.rect(centerPos.x, centerPos.y, width * rate)
          }

          const _drawStar = () => {
            const p = p5.PI / 5
            const r = (width * rate) / 1.8
            const pointList: Vector[] = []

            for (let i = 0; i < 5; i++) {
              pointList.push(
                p5.createVector(
                  centerPos.x + r * p5.sin(p + p * 2 * i), //
                  centerPos.y + r * p5.cos(p + p * 2 * i),
                ),
              )
            }

            p5.beginShape()
            p5.vertex(pointList[0].x, pointList[0].y)
            p5.vertex(pointList[2].x, pointList[2].y)
            p5.vertex(pointList[4].x, pointList[4].y)
            p5.vertex(pointList[1].x, pointList[1].y)
            p5.vertex(pointList[3].x, pointList[3].y)
            p5.endShape(p5.CLOSE)
          }

          drawBlock(p5, () => {
            if (value !== 0) {
              switch (value % 13) {
                case 1:
                  // 円
                  fill()
                  _drawEllipse()
                  break
                case 2:
                  // ずらした円
                  if (
                    (y % 2 === 0 && x % 2 === 1) ||
                    (y % 2 === 1 && x % 2 === 0)
                  ) {
                    fill()
                    _drawEllipse()
                  }
                  break
                case 3:
                  // 四角
                  fill()
                  _drawRect()
                  break
                case 4:
                  // ずらした四角
                  if (
                    (y % 2 === 0 && x % 2 === 1) ||
                    (y % 2 === 1 && x % 2 === 0)
                  ) {
                    fill()
                    _drawRect()
                  }
                  break
                case 5:
                  // スター
                  fill()
                  _drawStar()
                  break
                case 6:
                  // ずらしたスター
                  if (
                    (y % 2 === 0 && x % 2 === 1) ||
                    (y % 2 === 1 && x % 2 === 0)
                  ) {
                    fill()
                    _drawStar()
                  }
                  break
                case 7:
                  // 円
                  noFill()
                  _drawEllipse()
                  break
                case 8:
                  // ずらした円
                  if (
                    (y % 2 === 0 && x % 2 === 1) ||
                    (y % 2 === 1 && x % 2 === 0)
                  ) {
                    noFill()
                    _drawEllipse()
                  }
                  break
                case 9:
                  // 四角
                  noFill()
                  _drawRect()
                  break
                case 10:
                  // ずらした四角
                  if (
                    (y % 2 === 0 && x % 2 === 1) ||
                    (y % 2 === 1 && x % 2 === 0)
                  ) {
                    noFill()
                    _drawRect()
                  }
                  break
                case 11:
                  // スター
                  noFill()
                  _drawStar()
                  break
                case 12:
                  // ずらしたスター
                  if (
                    (y % 2 === 0 && x % 2 === 1) ||
                    (y % 2 === 1 && x % 2 === 0)
                  ) {
                    noFill()
                    _drawStar()
                  }
                  break
                default:
                  break
              }
            } else {
              p5.noFill()
              p5.noStroke()
            }
          })
        }

        for (let x = 0; x < count.x; x++) {
          for (let y = 0; y < count.y; y++) {
            loopFunc(x, y)
          }
        }
      })
    }

    p5.draw = () => {
      canvasSize = setup(canvasSize)
      p5.background(backgroundColor.h, backgroundColor.s, backgroundColor.b)

      drawCircle(
        p5.ceil(calcDataGridResult?.shapeCategory),
        p5.map(calcDataGridResult.shapeCount, 0, 15, 3, 50),
        p5.map(calcDataGridResult?.shapeCategoryRate, 0, 15, 0.1, 0.95),
      )

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
