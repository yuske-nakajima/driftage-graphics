import Head from '@/components/atoms/Head'
import SiteFooter from '@/components/organisms/SiteFooter'
import SiteHeader from '@/components/organisms/SiteHeader'
import SiteContainer from '@/components/templates/SiteContainer'
import SiteMainArea from '@/components/templates/SiteMainArea'
import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { P5CanvasInstance, SketchProps } from '@p5-wrapper/react'

type Props = {
  title: string
  sketch: (p5: P5CanvasInstance<SketchProps>) => void
}

const index = ({ title, sketch }: Props) => {
  return (
    <>
      <Head title={title} description={title} />
      <SiteContainer>
        <SiteHeader />
        <SiteMainArea title={title}>
          <NextReactP5Wrapper sketch={sketch} />
        </SiteMainArea>
        <SiteFooter />
      </SiteContainer>
    </>
  )
}
export default index
