import Head from '@/components/atoms/Head'
import SiteFooter from '@/components/organisms/SiteFooter'
import SiteHeader from '@/components/organisms/SiteHeader'
import SiteContainer from '@/components/templates/SiteContainer'
import SiteMainArea from '@/components/templates/SiteMainArea'
import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { P5CanvasInstance, SketchProps } from '@p5-wrapper/react'

type Props = {
  title: string
  description: string
  sketch: (p5: P5CanvasInstance<SketchProps>) => void
}

const index = ({ title, description, sketch }: Props) => {
  return (
    <>
      <Head title={title} description={description} />
      <SiteContainer>
        <SiteHeader />
        <SiteMainArea title={title} description={description}>
          <NextReactP5Wrapper sketch={sketch} />
        </SiteMainArea>
        <SiteFooter />
      </SiteContainer>
    </>
  )
}
export default index
