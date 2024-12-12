import { drawBlock, initSetup } from '@/lib/functions'
import type { P5CanvasInstance, Sketch } from '@p5-wrapper/react'
import type { Vector } from 'p5'
import type { PageInfo } from '@/lib/types'
import DefaultPage from '@/components/pages/DefaultPage'
import { useSearchParams } from 'next/navigation'
// import 'p5/lib/addons/p5.sound';

export const pageInfo: PageInfo = {
  title: 'ドラムマシン ver1',
  href: 'art/drum/ver1',
}

const sketch = (isFullScreen: boolean): Sketch => {
  return (p5: P5CanvasInstance) => {
    p5.preload = () => {
      // p5.soundFormats('mp3')
      // p5.loadSound("https://tentouser.github.io/jsonapi/sounds/kick.mp3")
    }

    let center: Vector
    let drawArea: {
      start: Vector
      end: Vector
    }

    let bpm: number
    let beatCount: number
    let lastBeatTime: number

    let canvasSize: Vector
    const setup = initSetup(p5, isFullScreen, () => {
      p5.colorMode(p5.HSB)

      center = p5.createVector(p5.width / 2, p5.height / 2)

      drawArea = {
        start: p5.createVector(p5.width / 4, p5.height / 4),
        end: p5.createVector(p5.width * (3 / 4), p5.height * (3 / 4)),
      }

      bpm = 300
      beatCount = 0
      lastBeatTime = 0
    })

    p5.setup = () => {
      canvasSize = setup(p5.createVector(0, 0))
      p5.frameRate(60)
    }

    const play = (i: number) => {
      // ドラムの音を鳴らす
      if (i === 0) {
        // const kick = p5.loadSound("https://tentouser.github.io/jsonapi/sounds/kick.mp3")
        // kick.play()
        console.log('ドン！')
      }
    }

    const beatEvent = () => {
      p5.background(0, 0, 95)

      // 現在のビート数とフレームカウントを表示
      p5.textSize(16)
      p5.text(`BPM: ${bpm}`, 20, 30)
      p5.text(`Beat: ${beatCount}`, 20, 60)

      drawBlock(p5, () => {
        p5.noStroke()
        p5.fill(0, 0, 90)
        p5.beginShape()
        p5.vertex(drawArea.start.x, drawArea.start.y)
        p5.vertex(drawArea.end.x, drawArea.start.y)
        p5.vertex(drawArea.end.x, drawArea.end.y)
        p5.vertex(drawArea.start.x, drawArea.end.y)
        p5.endShape(p5.CLOSE)
      })

      drawBlock(p5, () => {
        // drawArea内に gap 10 で 8 * 8 のドラムマシンを描画
        const drumSize = 8
        const drumWidth = (drawArea.end.x - drawArea.start.x) / drumSize
        const drumHeight = (drawArea.end.y - drawArea.start.y) / drumSize

        const one = beatCount % drumSize

        // 一旦マスを描画
        // p5.noStroke()
        for (let i = 0; i < drumSize; i++) {
          for (let j = 0; j < drumSize; j++) {
            if (one === i) {
              p5.fill(0, 0, 90)

              // 音を鳴らす
              play(j)
            } else {
              p5.fill(0, 0, 40)
            }
            p5.rect(
              drawArea.start.x + drumWidth * i,
              drawArea.start.y + drumHeight * j,
              drumWidth,
              drumHeight,
            )
          }
        }
      })
    }

    p5.draw = () => {
      canvasSize = setup(canvasSize)

      // 現在の時間（ミリ秒）を取得
      const currentTime = p5.millis()

      // 1ビートの長さをミリ秒で計算
      const beatInterval = 60000 / bpm

      lastBeatTime = lastBeatTime || currentTime

      // 次のビートの時間になったらビートイベントを実行
      if (currentTime - lastBeatTime >= beatInterval) {
        beatEvent()
        beatCount++
        lastBeatTime = currentTime
      }
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
