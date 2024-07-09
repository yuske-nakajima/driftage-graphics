import DefaultSketch from '@/components/pages/DefaultSketch'
import { drawBlock, fitCreateCanvas } from '@/lib/functions'
import { PageInfo } from '@/lib/types'
import type { Sketch } from '@p5-wrapper/react'
import { Vector } from 'p5'

export const pageInfo: PageInfo = {
  title: '円を並べた模様',
  description: '円を並べて拡張した',
  href: 'art/pattern/circle/line-up',
}

type circleType = {
  x: number
  y: number
  hue: number
}

const sketch: Sketch = (p5) => {
  const hueSize: number = p5.ceil(360 / p5.random(2, 60))
  const hueList: number[] = []
  for (let i = 0; i < 360; i += hueSize) {
    hueList.push(i)
  }

  let circleSize: number

  p5.setup = () => {
    fitCreateCanvas(p5)
    p5.colorMode(p5.HSB)
    p5.background(95)

    circleSize = p5.min(50, p5.width / 10)

    const circleMaxX = Math.ceil(p5.width / circleSize) + 1
    const circleMaxY = Math.ceil(p5.height / circleSize) + 1

    const circles1: circleType[][] = []
    for (let x = 0; x < circleMaxX; x++) {
      for (let y = 0; y < circleMaxY; y++) {
        let hue: number

        if (!circles1[x]) {
          circles1[x] = []
        }
        while (true) {
          hue = p5.random(hueList)

          // 上・左が同じ色だったらやり直し
          if (x > 0) {
            if (circles1[x - 1][y].hue === hue) {
              continue
            }
          }
          if (y > 0) {
            if (circles1[x][y - 1].hue === hue) {
              continue
            }
          }
          if (x > 1 && y > 0) {
            if (circles1[x - 2][y - 1].hue === hue) {
              continue
            }
          }
          break
        }

        circles1[x][y] = {
          x: x * circleSize,
          y: y * circleSize,
          hue,
        }
      }
    }

    const circles2 = circles1

    drawBlock(p5, () => {
      p5.noStroke()
      const saturation = p5.random(30, 60)
      const brightness = p5.random(80, 100)

      let circle1Position: Vector
      if (p5.random(1) < 0.5) {
        circle1Position = p5.createVector(-(circleSize / 2), circleSize / 2)
      } else {
        circle1Position = p5.createVector(circleSize / 2, circleSize / 2)
      }

      // 円を並べる
      for (let x = 0; x < circleMaxX; x++) {
        for (let y = 0; y < circleMaxY; y++) {
          p5.fill(circles1[x][y].hue, saturation, brightness)
          p5.ellipse(
            circles1[x][y].x + circle1Position.x,
            circles1[x][y].y + circle1Position.y,
            circleSize,
            circleSize,
          )
        }
      }
      for (let x = 0; x < circleMaxX; x++) {
        for (let y = 0; y < circleMaxY; y++) {
          p5.fill(circles2[x][y].hue, saturation, brightness)
          p5.ellipse(circles2[x][y].x, circles2[x][y].y, circleSize, circleSize)
        }
      }
    })
  }

  p5.draw = () => {}
}

const index = () => {
  const { title, description } = pageInfo

  return (
    <DefaultSketch title={title} description={description} sketch={sketch} />
  )
}
export default index
