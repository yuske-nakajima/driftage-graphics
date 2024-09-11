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

type Key = {
  value: number
  isPressed: boolean
}

const dataGrid: Key[][] = []
const gridSize = 8

// 左側（黄色）部分の値の設定
for (let row = 0; row < gridSize; row++) {
  const gridHalf = gridSize / 2
  const r: Key[] = []
  for (let col = 0; col < gridSize; col++) {
    let value = 36 + row * gridHalf + col
    const isPressed = false
    if (col >= gridHalf) {
      value += 28
    }
    r.push({ value, isPressed })
  }
  dataGrid.unshift(r)
}

const isPressed = (data: number) => {
  return data === 127
}

const midiSetup = async (
  pressedCallback: (i: number) => void,
  pressedKeyList: number[],
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

        if (pressedKeyList.includes(i)) {
          output.send([0x90, i, 41/* 色コード */])
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

const sketch = (isFullScreen: boolean): Sketch => {
  return (p5: P5CanvasInstance) => {
    let canvasSize: Vector
    let centerPos: Vector
    const pressedKeyList: number[] = []
    let backgroundColor: { h: number; s: number; b: number }

    // ----------
    // セットアップ
    // ----------
    const setup = initSetup(p5, isFullScreen, async () => {
      centerPos = p5.createVector(p5.width / 2, p5.height / 2)
      backgroundColor = {
        h: p5.random(0, 360),
        s: p5.random(80, 100),
        b: p5.random(80, 100),
      }

      p5.colorMode(p5.HSB)
      p5.frameRate(24)
      await midiSetup(
        (i) => {
          if (!pressedKeyList.includes(i)) {
            pressedKeyList.push(i)
          } else {
            pressedKeyList.splice(pressedKeyList.indexOf(i), 1)
          }

          // 背景色を変更する
          backgroundColor = {
            h: p5.random(0, 360),
            s: p5.random(80, 100),
            b: p5.random(80, 100),
          }
        },
        pressedKeyList,
      )
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
        const gridAreaWidth = p5.width / 4
        const gridWidth = gridAreaWidth / gridSize

        const gridPos = p5.createVector(
          centerPos.x - gridAreaWidth / 2,
          centerPos.y - gridAreaWidth / 2,
        )

        drawBlock(p5, () => {
          p5.fill(0, 0, 0)
          p5.rect(
            gridPos.x - 10,
            gridPos.y - 10,
            gridAreaWidth + 20,
            gridAreaWidth + 20,
          )
        })

        p5.strokeWeight(2)
        for (let row = 0; row < gridSize; row++) {
          for (let col = 0; col < gridSize; col++) {
            if (pressedKeyList.includes(dataGrid[row][col].value)) {
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

            drawBlock(p5, () => {
              p5.noStroke()
              p5.fill(0, 0, 0)
              p5.textAlign(p5.CENTER, p5.CENTER)
              p5.textSize(gridWidth / 2)
              p5.text(
                `${dataGrid[row][col].value}`,
                col * gridWidth + gridPos.x + gridWidth / 2,
                row * gridWidth + gridPos.y + gridWidth / 2,
              )
            })
          }
        }
      })
    }

    p5.draw = () => {
      canvasSize = setup(canvasSize)
      p5.background(backgroundColor.h, backgroundColor.s, backgroundColor.b)
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
