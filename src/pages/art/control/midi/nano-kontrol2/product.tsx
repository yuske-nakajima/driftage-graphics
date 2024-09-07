import { MidiControlNanoKONTROL2 } from '@/components/midiControl/nanoKONTROL2'
import DefaultSketch from '@/components/pages/DefaultSketch'
import { fitCreateCanvas } from '@/lib/functions'
import { setup as midiSetup } from '@/lib/midiControl/nanoKONTROL2'
import { PageInfo } from '@/lib/types'
import type { Sketch } from '@p5-wrapper/react'

export const pageInfo: PageInfo = {
  title: 'nanoKONTROL2 を描画',
  href: 'art/control/midi/nano-kontrol2/product',
}

const sketch: Sketch = (p5) => {
  let midiControlNanoKONTROL2: MidiControlNanoKONTROL2

  p5.setup = async () => {
    fitCreateCanvas(p5)
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
  }

  p5.draw = () => {
    p5.background(95)
    midiControlNanoKONTROL2.display()
  }
}

const index = () => {
  const { title } = pageInfo

  return <DefaultSketch title={title} sketch={sketch} />
}
export default index
