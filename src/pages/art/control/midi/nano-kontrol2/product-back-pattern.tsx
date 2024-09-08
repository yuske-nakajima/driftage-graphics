import { MidiControlNanoKONTROL2 } from '@/components/midiControl/nanoKONTROL2'
import DefaultPage from '@/components/pages/DefaultPage'
import { initSetup } from '@/lib/functions'
import {
  NanoKONTROL2,
  setup as midiSetup,
} from '@/lib/midiControl/nanoKONTROL2'
import { PageInfo } from '@/lib/types'
import type { P5CanvasInstance, Sketch } from '@p5-wrapper/react'
import { useSearchParams } from 'next/navigation'
import { Vector } from 'p5'

export const pageInfo: PageInfo = {
  title: 'nanoKONTROL2 + 模様',
  href: 'art/control/midi/nano-kontrol2/product-back-pattern',
}

const sketch = (isFullScreen: boolean): Sketch => {
  return (p5: P5CanvasInstance) => {
    let midiControlNanoKONTROL2: MidiControlNanoKONTROL2
    let data: NanoKONTROL2 | undefined
    let center: Vector

    let hue: number
    let saturation: number
    let brightness: number
    let opacity: number
    let kaku: number
    let size: number
    let fillHue: number
    let fillSaturation: number

    let canvasSize: Vector
    const setup = initSetup(p5, isFullScreen, async () => {
      p5.colorMode(p5.HSB)
      p5.frameRate(24)

      data = await midiSetup()

      const productWidth = MidiControlNanoKONTROL2.getWidth
      const productHeight = MidiControlNanoKONTROL2.getHeight

      center = p5.createVector(p5.width / 2, p5.height / 2)
      let leftTop = p5.createVector(
        center.x - productWidth / 2,
        center.y - productHeight / 2 + productHeight / 1.2,
      )
      midiControlNanoKONTROL2 = new MidiControlNanoKONTROL2(
        p5,
        p5.color(240, 100, 10),
        p5.color(0, 0, 100),
        p5.color(0, 50, 100),
        leftTop,
        data,
      )
    })

    p5.setup = () => {
      canvasSize = setup(p5.createVector(0, 0))
    }

    p5.draw = () => {
      canvasSize = setup(canvasSize)

      p5.background(255)
      if (!data) return

      const hueMax = p5.map(data.unit[1].slider, 0, 127, 180, 360)
      hue = p5.map(data.unit[1].knob, 0, 127, 0, hueMax)
      if (data.unit[1].solo) {
        hue = (hue + 180) % 360
      }
      if (data.unit[1].mute) {
        hue = (hue + 30) % 360
      }
      if (data.unit[1].rec) {
        if (p5.frameCount % 8 === 0) {
          hue = (hue + 30) % 360
        }
      }

      const saturationMax = p5.map(data.unit[2].slider, 0, 127, 50, 100)
      saturation = p5.map(data.unit[2].knob, 0, 127, 0, saturationMax)
      if (data.unit[2].solo) {
        saturation = 100
      }
      if (data.unit[2].mute) {
        saturation = 20
      }
      if (data.unit[2].rec) {
        if (p5.frameCount % 8 === 0) {
          saturation = (saturation + 20) % 100
        }
      }

      const brightnessMax = p5.map(data.unit[3].slider, 0, 127, 50, 100)
      brightness = p5.map(data.unit[3].knob, 0, 127, 0, brightnessMax)
      if (data.unit[3].solo) {
        brightness = 100
      }
      if (data.unit[3].mute) {
        brightness = 30
      }
      if (data.unit[3].rec) {
        if (p5.frameCount % 8 === 0) {
          brightness = (brightness + 20) % 100
        }
      }

      const opacityMax = p5.map(data.unit[4].slider, 0, 127, 0.5, 1.0)
      opacity = p5.map(data.unit[4].knob, 0, 127, 0.2, opacityMax)
      if (data.unit[4].solo) {
        opacity = 1.0
      }
      if (data.unit[4].mute) {
        opacity = 0.2
      }
      if (data.unit[4].rec) {
        if (p5.frameCount % 8 === 0) {
          opacity = (opacity + 0.1) % 1.0
        }
      }

      // 背景
      p5.background(hue, saturation, brightness, opacity)

      // 真ん中に多角形
      const kakuMax = p5.map(data.unit[5].slider, 0, 127, 6, 32)
      kaku = p5.map(data.unit[5].knob, 0, 127, 5, kakuMax)
      if (data.unit[5].solo) {
        kaku = 32
      }
      if (data.unit[5].mute) {
        kaku = 6
      }
      if (data.unit[5].rec) {
        if (p5.frameCount % 8 === 0) {
          kaku = (kaku + 1) % 32 <= 6 ? 6 : (kaku + 1) % 32
        }
      }

      const sizeMax = p5.map(data.unit[6].slider, 0, 127, 50, 400)
      size = p5.map(data.unit[6].knob, 0, 127, 30, sizeMax)
      if (data.unit[6].solo) {
        size = 400
      }
      if (data.unit[6].mute) {
        size = 50
      }
      if (data.unit[6].rec) {
        if (p5.frameCount % 8 === 0) {
          size = (size + size / 10) % 400
        }
      }

      p5.vertex(center.x, center.y)
      p5.beginShape()
      for (let i = 0; i < kaku; i++) {
        const angle = (p5.TWO_PI / kaku) * i
        const x = center.x + p5.cos(angle) * size
        const y = center.y - 100 + p5.sin(angle) * size
        p5.vertex(x, y)
      }

      const fillHueMax = p5.map(data.unit[7].slider, 0, 127, 180, 360)
      fillHue = p5.map(data.unit[7].knob, 0, 127, 0, fillHueMax)
      if (data.unit[7].solo) {
        fillHue = (fillHue + 180) % 360
      }
      if (data.unit[7].mute) {
        fillHue = (fillHue + 30) % 360
      }
      if (data.unit[7].rec) {
        if (p5.frameCount % 8 === 0) {
          fillHue = (fillHue + 30) % 360
        }
      }

      const fillSaturationMax = p5.map(data.unit[8].slider, 0, 127, 50, 100)
      fillSaturation = p5.map(data.unit[8].knob, 0, 127, 0, fillSaturationMax)
      if (data.unit[8].solo) {
        fillSaturation = 100
      }
      if (data.unit[8].mute) {
        fillSaturation = 20
      }
      if (data.unit[8].rec) {
        if (p5.frameCount % 8 === 0) {
          fillSaturation = (fillSaturation + 20) % 100
        }
      }

      p5.fill(fillHue, fillSaturation, 90)
      p5.endShape(p5.CLOSE)

      midiControlNanoKONTROL2.display()
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
