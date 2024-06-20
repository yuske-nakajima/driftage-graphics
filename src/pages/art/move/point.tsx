import SiteContainer from '@/components/SiteContainer'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'
import SiteMainArea from '@/components/SiteMainArea'

import { drawBlock, fitCreateCanvas } from '@/lib/functions'
import { NextReactP5Wrapper } from '@p5-wrapper/next'
import type { Sketch } from '@p5-wrapper/react'
import { Vector } from 'p5'

const moveLevel = 3

const sketch: Sketch = (p5) => {
  const dotPointList: Array<Vector> = []
  p5.setup = () => {
    fitCreateCanvas(p5)
    p5.colorMode(p5.HSB)
    p5.frameRate(12)

    const interval = p5.createVector((p5.width - 1) / 20, (p5.height - 1) / 20)

    for (let x = 0; x * interval.x < p5.width; x++) {
      for (let y = 0; y * interval.y < p5.height; y++) {
        dotPointList.push(p5.createVector(x * interval.x, y * interval.y))
      }
    }
  }

  p5.draw = () => {
    drawBlock(p5, () => {
      p5.background(95)
      p5.noStroke()
      dotPointList.forEach((point) => {
        drawBlock(p5, () => {
          p5.fill(0, 100, 0)
          p5.circle(
            p5.noise(p5.frameCount * p5.random(1, moveLevel)) *
              p5.random(1, moveLevel) +
              point.x,
            point.y,
            20,
          )
        })
        drawBlock(p5, () => {
          p5.fill(0, 0, 100)
          p5.circle(point.x, point.y, 10)
        })
      })
    })
  }
}

const index = () => {
  return (
    <>
      <SiteContainer>
        <SiteHeader />
        <SiteMainArea name={'grid'} description={'点を並べて'}>
          <NextReactP5Wrapper sketch={sketch} />
        </SiteMainArea>
        <SiteFooter />
      </SiteContainer>
    </>
  )
}
export default index
