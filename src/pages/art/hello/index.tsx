import SiteContainer from '@/components/SiteContainer'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'
import SiteMainArea from '@/components/SiteMainArea'

const index = () => {
  return (
    <>
      <SiteContainer>
        <SiteHeader />
        <SiteMainArea name={'hello'} description={'hello'}>
          <div>ここに絵が入る</div>
        </SiteMainArea>
        <SiteFooter />
      </SiteContainer>
    </>
  )
}
export default index
