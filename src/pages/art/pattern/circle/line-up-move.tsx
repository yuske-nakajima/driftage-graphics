import DefaultPage from '@/components/pages/DefaultPage'
import { drawBlock, initSetup } from '@/lib/functions'
import { PageInfo } from '@/lib/types'
import type { P5CanvasInstance, Sketch } from '@p5-wrapper/react'
import { useSearchParams } from 'next/navigation'
import { Vector } from 'p5'

export const pageInfo: PageInfo = {
  title: '円を並べた模様の中にクルクル',
  href: 'art/pattern/circle/line-up-move',
}

type circleType = {
  x: number
  y: number
  hue: number
  isMove: boolean
}

const sketch = (isFullScreen: boolean): Sketch => {
  return (p5: P5CanvasInstance) => {
    let circleSize: number
    let circleMaxX: number
    let circleMaxY: number

    let circles1: circleType[][]
    let circles2: circleType[][]
    let circle1Position: Vector

    let saturation: number
    let brightness: number

    let canvasSize: Vector
    const setup = initSetup(p5, isFullScreen, () => {
      circles1 = []

      p5.colorMode(p5.HSB)
      p5.frameRate(12)

      // const hueSize: number = p5.ceil(360 / p5.random(2, 18))
      const hueSize = 10
      const hueList: number[] = []
      for (let i = p5.random(0, 50); i < p5.random(310, 360); i += hueSize) {
        hueList.push(i)
      }

      circleSize = p5.min(50, p5.width / 10)
      circleMaxX = Math.ceil(p5.width / circleSize) + 1
      circleMaxY = Math.ceil(p5.height / circleSize) + 1

      saturation = p5.random(50, 60)
      brightness = p5.random(80, 90)

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
            if (y > circleMaxY / 2) {
              if (circles1[x][y - 1].hue === hue) {
                continue
              }
            }

            // 一つ飛ばしの左上
            if (x > 1 && y > circleMaxY / 2) {
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
            isMove: p5.random([0, 1]) === 0,
          }
        }
      }

      circles2 = [...circles1]

      // circle2のを並び替え
      for (let x = 0; x < circleMaxX; x++) {
        for (let y = 0; y < circleMaxY; y++) {
          const swapX = p5.floor(p5.random(circleMaxX))
          const swapY = p5.floor(p5.random(circleMaxY))
          const tmp = circles2[x][y]
          circles2[x][y] = circles2[swapX][swapY]
          circles2[swapX][swapY] = tmp
        }
      }

      if (p5.random(1) < 0.5) {
        circle1Position = p5.createVector(-(circleSize / 2), circleSize / 2)
      } else {
        circle1Position = p5.createVector(circleSize / 2, circleSize / 2)
      }

      drawBlock(p5, () => {
        p5.background(95)
        p5.noStroke()
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
      })
    })

    p5.setup = () => {
      canvasSize = setup(p5.createVector(0, 0))
    }

    p5.draw = () => {
      canvasSize = setup(canvasSize)

      drawBlock(p5, () => {
        for (let x = 0; x < circleMaxX; x++) {
          for (let y = 0; y < circleMaxY; y++) {
            drawBlock(p5, () => {
              p5.noStroke()
              p5.fill(circles2[x][y].hue, saturation, brightness)
              p5.ellipse(
                circles2[x][y].x,
                circles2[x][y].y,
                circleSize,
                circleSize,
              )
            })
          }
        }
      })

      drawBlock(p5, () => {
        p5.noFill()
        p5.strokeWeight(4)
        p5.stroke(0, 0, 100, 0.4)

        for (let x = 0; x < circleMaxX; x++) {
          for (let y = 0; y < circleMaxY; y++) {
            // arc 回す
            if (circles2[x][y].isMove) {
              if (p5.frameCount % 4 === 0) {
                p5.arc(
                  circles2[x][y].x,
                  circles2[x][y].y,
                  circleSize - 4,
                  circleSize - 4,
                  0,
                  p5.HALF_PI,
                )
              } else if (p5.frameCount % 4 === 1) {
                p5.arc(
                  circles2[x][y].x,
                  circles2[x][y].y,
                  circleSize - 4,
                  circleSize - 4,
                  p5.HALF_PI,
                  p5.PI,
                )
              } else if (p5.frameCount % 4 === 2) {
                p5.arc(
                  circles2[x][y].x,
                  circles2[x][y].y,
                  circleSize - 4,
                  circleSize - 4,
                  p5.PI,
                  p5.PI + p5.HALF_PI,
                )
              } else {
                p5.arc(
                  circles2[x][y].x,
                  circles2[x][y].y,
                  circleSize - 4,
                  circleSize - 4,
                  p5.PI + p5.HALF_PI,
                  p5.TWO_PI,
                )
              }
            }
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
