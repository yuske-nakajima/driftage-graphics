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

// type Coordinate = { x: number; y: number }
// const directions: Coordinate[] = [
//   { x: 1, y: 0 }, // 右
//   { x: -1, y: 0 }, // 左
//   { x: 0, y: 1 }, // 下
//   { x: 0, y: -1 }, // 上
// ]

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

// const retractWave = (center: Coordinate, output: WebMidi.MIDIOutput) => {
//   let queue: Coordinate[] = [center]
//   const interval = setInterval(() => {
//     const nextQueue: Coordinate[] = []
//     for (const { x, y } of queue) {
//       for (const { x: dx, y: dy } of directions) {
//         const newX = x + dx
//         const newY = y + dy
//         // グリッドの範囲内かつまだtrueならfalseにする
//         if (
//           newX >= 0 &&
//           newX < gridSize &&
//           newY >= 0 &&
//           newY < gridSize &&
//           dataGrid[newY][newX].isPressed
//         ) {
//           dataGrid[newY][newX].isPressed = false
//           output.send([0x90, dataGrid[newY][newX].value, 0])
//           nextQueue.push({ x: newX, y: newY })
//         }
//       }
//     }
//     queue = nextQueue
//
//     // 全てがfalseになったら処理を停止
//     if (queue.length === 0) {
//       clearInterval(interval)
//     }
//   }, 25)
// }

// const spreadWave = async (center: Coordinate, output: WebMidi.MIDIOutput) => {
//   // 初期化
//   dataGrid.forEach((row) => {
//     row.forEach((key) => {
//       key.isPressed = false
//       output.send([0x90, key.value, 0])
//     })
//   })
//
//   let queue: Coordinate[] = [center]
//   dataGrid[center.y][center.x].isPressed = true
//
//   const interval = setInterval(() => {
//     const nextQueue: Coordinate[] = []
//     for (const { x, y } of queue) {
//       for (const { x: dx, y: dy } of directions) {
//         const newX = x + dx
//         const newY = y + dy
//         // グリッドの範囲内かつまだfalseならtrueにする
//         if (
//           newX >= 0 &&
//           newX < gridSize &&
//           newY >= 0 &&
//           newY < gridSize &&
//           !dataGrid[newY][newX].isPressed
//         ) {
//           dataGrid[newY][newX].isPressed = true
//           output.send([0x90, dataGrid[newY][newX].value, 127])
//           nextQueue.push({ x: newX, y: newY })
//         }
//       }
//     }
//     queue = nextQueue
//
//     // 全てがtrueになったら、今度はfalseにする
//     if (queue.length === 0) {
//       clearInterval(interval)
//       retractWave(center, output)
//     }
//   }, 30)
// }

const isPressed = (data: number) => {
  return data === 127
}

const midiSetup = async (
  pressedFunc: (i: number) => void,
  releasedFunc: (i: number) => void,
  pressedKeyList: number[],
) => {
  try {
    const access = await navigator.requestMIDIAccess()
    const output = Array.from(access.outputs.values()).filter(
      (output) => output.name === 'Launchpad Mini MK3 LPMiniMK3 MIDI In',
    )[0]
    const input = Array.from(access.inputs.values()).filter(
      (input) => input.name === 'Launchpad Mini MK3 LPMiniMK3 MIDI Out',
    )[0]

    for (let i = 36; i <= 99; i++) {
      output.send([0x90, i, 0])
    }

    input.onmidimessage = (event: WebMidi.MIDIMessageEvent) => {
      for (let i = 36; i <= 99; i++) {
        if (event.data[1] !== i) {
          continue
        }
        // output.send([0x90, i, isPressed(event.data[2]) ? 127 : 0])
        // if (isPressed(event.data[2])) {
        //   for (const row of dataGrid) {
        //     for (const key of row) {
        //       if (key.value === i) {
        //         spreadWave(
        //           { x: row.indexOf(key), y: dataGrid.indexOf(row) },
        //           output,
        //         )
        //       }
        //     }
        //   }
        // }
        // pressedKeyListに入ってる番号を光らせる

        if (isPressed(event.data[2])) {
          pressedFunc(i)
        } else {
          releasedFunc(i)
        }

        for (const pressedKeyIndex of pressedKeyList) {
          output.send([0x90, pressedKeyIndex, 127])
        }
      }
    }
  } catch (e) {
    console.error(e)
    return 'エラーが発生しました'
  }
}

const sketch = (isFullScreen: boolean): Sketch => {
  return (p5: P5CanvasInstance) => {
    let canvasSize: Vector
    let displayText: string
    let centerPos: Vector
    const pressedKeyList: number[] = []

    const setup = initSetup(p5, isFullScreen, async () => {
      centerPos = p5.createVector(p5.width / 2, p5.height / 2)

      p5.colorMode(p5.HSB)
      p5.frameRate(24)
      await midiSetup(
        (i) => {
          displayText = `Key ${i} is pressed`

          if (!pressedKeyList.includes(i)) {
            pressedKeyList.push(i)
          } else {
            pressedKeyList.splice(pressedKeyList.indexOf(i), 1)
          }
        },
        (i) => {
          displayText = `Key ${i} is released`
        },
        pressedKeyList,
      )
    })

    p5.setup = () => {
      canvasSize = setup(p5.createVector(0, 0))
    }

    p5.draw = () => {
      canvasSize = setup(canvasSize)
      p5.background(95)

      drawBlock(p5, () => {
        p5.textSize(24)
        p5.textAlign(p5.CENTER, p5.CENTER)
        p5.text(displayText, centerPos.x, centerPos.y)
      })

      drawBlock(p5, () => {
        // グリッドの状態を表示
        const gridSize = 8
        const gridWidth = p5.width / gridSize
        const gridHeight = p5.height / gridSize
        for (let row = 0; row < gridSize; row++) {
          for (let col = 0; col < gridSize; col++) {
            if (pressedKeyList.includes(dataGrid[row][col].value)) {
              // hsbでオレンジのフィル
              p5.fill(30, 100, 100)
            } else {
              p5.fill(0, 0, 100)
            }
            p5.rect(col * gridWidth, row * gridHeight, gridWidth, gridHeight)
          }
        }
      })
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
