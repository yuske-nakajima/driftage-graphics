import DefaultSketch from '@/components/pages/DefaultSketch'
import { drawBlock, fitCreateCanvas } from '@/lib/functions'
import { PageInfo } from '@/lib/types'
import type { Sketch } from '@p5-wrapper/react'

export const pageInfo: PageInfo = {
  title: 'midi信号を表示（launchpad mini mk3）',
  description: 'midi信号を表示（launchpad mini mk3）',
  href: 'art/control/midi/launchpad-mini-mk3/display',
}

type Key = {
  value: number
  isPressed: boolean
}

type Coordinate = { x: number; y: number }
const directions: Coordinate[] = [
  { x: 1, y: 0 }, // 右
  { x: -1, y: 0 }, // 左
  { x: 0, y: 1 }, // 下
  { x: 0, y: -1 }, // 上
]

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

const retractWave = (center: Coordinate, output: WebMidi.MIDIOutput) => {
  let queue: Coordinate[] = [center]
  const interval = setInterval(() => {
    const nextQueue: Coordinate[] = []
    for (const { x, y } of queue) {
      for (const { x: dx, y: dy } of directions) {
        const newX = x + dx
        const newY = y + dy
        // グリッドの範囲内かつまだtrueならfalseにする
        if (
          newX >= 0 &&
          newX < gridSize &&
          newY >= 0 &&
          newY < gridSize &&
          dataGrid[newY][newX].isPressed
        ) {
          dataGrid[newY][newX].isPressed = false
          output.send([0x90, dataGrid[newY][newX].value, 0])
          nextQueue.push({ x: newX, y: newY })
        }
      }
    }
    queue = nextQueue

    // 全てがfalseになったら処理を停止
    if (queue.length === 0) {
      clearInterval(interval)
    }
  }, 25)
}

const spreadWave = async (center: Coordinate, output: WebMidi.MIDIOutput) => {
  // 初期化
  dataGrid.forEach((row) => {
    row.forEach((key) => {
      key.isPressed = false
      output.send([0x90, key.value, 0])
    })
  })

  let queue: Coordinate[] = [center]
  dataGrid[center.y][center.x].isPressed = true

  const interval = setInterval(() => {
    const nextQueue: Coordinate[] = []
    for (const { x, y } of queue) {
      for (const { x: dx, y: dy } of directions) {
        const newX = x + dx
        const newY = y + dy
        // グリッドの範囲内かつまだfalseならtrueにする
        if (
          newX >= 0 &&
          newX < gridSize &&
          newY >= 0 &&
          newY < gridSize &&
          !dataGrid[newY][newX].isPressed
        ) {
          dataGrid[newY][newX].isPressed = true
          output.send([0x90, dataGrid[newY][newX].value, 127])
          nextQueue.push({ x: newX, y: newY })
        }
      }
    }
    queue = nextQueue

    // 全てがtrueになったら、今度はfalseにする
    if (queue.length === 0) {
      clearInterval(interval)
      retractWave(center, output)
    }
  }, 30)
}

const isPressed = (data: number) => {
  return data === 127
}

const midiSetup = async () => {
  try {
    const access = await navigator.requestMIDIAccess()
    const output = Array.from(access.outputs.values()).filter(
      (output) => output.name === 'Launchpad Mini MK3 LPMiniMK3 MIDI In',
    )[0]
    const input = Array.from(access.inputs.values()).filter(
      (input) => input.name === 'Launchpad Mini MK3 LPMiniMK3 MIDI Out',
    )[0]

    input.onmidimessage = (event: WebMidi.MIDIMessageEvent) => {
      for (let i = 36; i <= 99; i++) {
        if (event.data[1] !== i) {
          continue
        }
        console.clear()
        console.log(
          isPressed(event.data[2]) ? `${i}が押された` : `${i}が離された`,
        )
        output.send([0x90, i, isPressed(event.data[2]) ? 127 : 0])
        if (isPressed(event.data[2])) {
          for (const row of dataGrid) {
            for (const key of row) {
              if (key.value === i) {
                spreadWave(
                  { x: row.indexOf(key), y: dataGrid.indexOf(row) },
                  output,
                )
              }
            }
          }
        }
      }
    }
  } catch (e) {
    console.error(e)
  }
}

const sketch: Sketch = (p5) => {
  p5.setup = async () => {
    fitCreateCanvas(p5)
    p5.colorMode(p5.HSB)
    p5.frameRate(24)

    await midiSetup()
  }

  p5.draw = () => {
    drawBlock(p5, () => {})
  }
}

const index = () => {
  const { title, description } = pageInfo

  return (
    <DefaultSketch title={title} description={description} sketch={sketch} />
  )
}
export default index
