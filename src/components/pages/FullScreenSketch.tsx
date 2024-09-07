import Head from '@/components/atoms/Head'
import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { P5CanvasInstance } from '@p5-wrapper/react'

type Props = {
  title: string
  sketch: (p5: P5CanvasInstance) => void
}

const index = ({ title, sketch }: Props) => {
  return (
    <>
      <Head title={title} description={title} />
      <NextReactP5Wrapper sketch={sketch} />
    </>
  )
}
export default index
