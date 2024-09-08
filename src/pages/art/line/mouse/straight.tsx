import DefaultPage from '@/components/pages/DefaultPage'
import { initSetup } from '@/lib/functions'
import { PageInfo } from '@/lib/types'
import type { P5CanvasInstance, Sketch } from '@p5-wrapper/react'
import { useSearchParams } from 'next/navigation'
import { Vector } from 'p5'

export const pageInfo: PageInfo = {
  title: 'マウスまでの線',
  href: 'art/line/mouse/straight',
}

const sketch = (isFullScreen: boolean): Sketch => {
  return (p5: P5CanvasInstance) => {
    let center: Vector
    let mouse: Vector

    let canvasSize: Vector
    const setup = initSetup(p5, isFullScreen, () => {
      p5.colorMode(p5.HSB)
      p5.frameRate(24)

      center = p5.createVector(p5.width / 2, p5.height / 2)
      mouse = p5.createVector(p5.width / 2, p5.height / 2)
    })

    p5.setup = () => {
      canvasSize = setup(p5.createVector(0, 0))
    }

    p5.draw = () => {
      canvasSize = setup(canvasSize)

      p5.background(0, 0, 95)
      p5.stroke(0, 0, 0)
      p5.strokeWeight(2)
      p5.line(center.x, center.y, mouse.x, mouse.y)
    }

    // マウスの位置
    p5.mouseMoved = () => {
      mouse = p5.createVector(p5.mouseX, p5.mouseY)
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
