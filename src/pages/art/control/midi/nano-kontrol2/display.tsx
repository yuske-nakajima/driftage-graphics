import DefaultSketch from '@/components/pages/DefaultSketch'
import { drawBlock, fitCreateCanvas } from '@/lib/functions'
import {
  NanoKONTROL2,
  UnitList,
  UnitType,
  setup as midiSetup,
} from '@/lib/midiControl/nanoKONTROL2'
import { PageInfo } from '@/lib/types'
import type { Sketch } from '@p5-wrapper/react'
import { Vector } from 'p5'

export const pageInfo: PageInfo = {
  title: 'midi信号を表示（nano kontrol）',
  href: 'art/control/midi/nano-kontrol2/display',
}

const sketch: Sketch = (p5) => {
  let data: NanoKONTROL2 | undefined

  const unitDisplayText = (
    unit: UnitList,
    unitType: UnitType,
    startPos: Vector,
    height: number,
  ) => {
    const { solo, mute, rec, knob, slider } = unit[unitType]

    const { x: labelX, y } = startPos
    const valueX = labelX + 190

    p5.text(`unit${unitType} solo:`, labelX, y)
    p5.text(`${solo}`, valueX, y)

    p5.text(`unit${unitType} mute:`, labelX, y + height)
    p5.text(`${mute}`, valueX, y + height)

    p5.text(`unit${unitType} rec:`, labelX, y + height * 2)
    p5.text(`${rec}`, valueX, y + height * 2)

    p5.text(`unit${unitType} knob:`, labelX, y + height * 3)
    p5.text(`${knob}`, valueX, y + height * 3)

    p5.text(`unit${unitType} slider:`, labelX, y + height * 4)
    p5.text(`${slider}`, valueX, y + height * 4)
  }

  p5.setup = async () => {
    fitCreateCanvas(p5)
    p5.colorMode(p5.HSB)
    p5.frameRate(24)

    data = await midiSetup()
  }

  p5.draw = () => {
    drawBlock(p5, () => {
      if (!data) {
        return
      }

      p5.background(95)
      p5.textSize(20)
      p5.textAlign(p5.LEFT, p5.TOP)
      p5.fill(0)

      const {
        trackPrevious,
        trackNext,
        cycle,
        set,
        makerPrevious,
        makerNext,
        rewind,
        fastForward,
        stop,
        play,
        record,
        unit,
      } = data

      drawBlock(p5, () => {
        p5.textSize(30)
        p5.text('midi信号を表示', 50, 20)
      })

      const labelX = 50
      const valueX = 240

      p5.text(`track previous:`, labelX, 60)
      p5.text(`${trackPrevious}`, valueX, 60)

      p5.text(`track next:`, labelX, 80)
      p5.text(`${trackNext}`, valueX, 80)

      p5.text(`cycle:`, labelX, 100)
      p5.text(`${cycle}`, valueX, 100)

      p5.text(`set:`, labelX, 120)
      p5.text(`${set}`, valueX, 120)

      p5.text(`maker previous:`, labelX, 140)
      p5.text(`${makerPrevious}`, valueX, 140)

      p5.text(`maker next:`, labelX, 160)
      p5.text(`${makerNext}`, valueX, 160)

      p5.text(`rewind:`, labelX, 180)
      p5.text(`${rewind}`, valueX, 180)

      p5.text(`fast forward:`, labelX, 200)
      p5.text(`${fastForward}`, valueX, 200)

      p5.text(`stop:`, labelX, 220)
      p5.text(`${stop}`, valueX, 220)

      p5.text(`play:`, labelX, 240)
      p5.text(`${play}`, valueX, 240)

      p5.text(`record:`, labelX, 260)
      p5.text(`${record}`, valueX, 260)

      unitDisplayText(unit, 1, p5.createVector(50, 300), 20)
      unitDisplayText(unit, 2, p5.createVector(50, 420), 20)
      unitDisplayText(unit, 3, p5.createVector(50, 540), 20)
      unitDisplayText(unit, 4, p5.createVector(50, 660), 20)

      unitDisplayText(unit, 5, p5.createVector(400, 300), 20)
      unitDisplayText(unit, 6, p5.createVector(400, 420), 20)
      unitDisplayText(unit, 7, p5.createVector(400, 540), 20)
      unitDisplayText(unit, 8, p5.createVector(400, 660), 20)
    })
  }
}

const index = () => {
  const { title } = pageInfo

  return <DefaultSketch title={title} sketch={sketch} />
}
export default index
