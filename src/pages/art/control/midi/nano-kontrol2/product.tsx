import { MidiControlNanoKONTROL2 } from '@/components/midiControl/nanoKONTROL2'
import DefaultPage from '@/components/pages/DefaultPage'
import { initSetup } from '@/lib/functions'
import { setup as midiSetup } from '@/lib/midiControl/nanoKONTROL2'
import { PageInfo } from '@/lib/types'
import type { P5CanvasInstance, Sketch } from '@p5-wrapper/react'
import { useSearchParams } from 'next/navigation'
import { Vector } from 'p5'

export const pageInfo: PageInfo = {
  title: 'nanoKONTROL2 を描画',
  href: 'art/control/midi/nano-kontrol2/product',
}

const sketch = (isFullScreen: boolean): Sketch => {
  return (p5: P5CanvasInstance) => {
    let midiControlNanoKONTROL2: MidiControlNanoKONTROL2

    let canvasSize: Vector
    const setup = initSetup(p5, isFullScreen, async () => {
      p5.colorMode(p5.HSB)
      p5.frameRate(24)

      let data = await midiSetup()

      // // 諸々の値
      const productWidth = MidiControlNanoKONTROL2.getWidth
      const productHeight = MidiControlNanoKONTROL2.getHeight

      let center = p5.createVector(p5.width / 2, p5.height / 2)
      let leftTop = p5.createVector(
        center.x - productWidth / 2,
        center.y - productHeight / 2,
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

      p5.background(95)
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
