import DefaultSketch from '@/components/pages/DefaultSketch'
import FullScreenSketch from '@/components/pages/FullScreenSketch'
import { P5CanvasInstance } from '@p5-wrapper/react'

type Props = {
  title: string
  sketch: (p5: P5CanvasInstance) => void
  isFullScreen: boolean
}

const index = ({ title, sketch, isFullScreen }: Props) => {
  return isFullScreen ? (
    <FullScreenSketch title={title} sketch={sketch} />
  ) : (
    <DefaultSketch title={title} sketch={sketch} />
  )
}

export default index
