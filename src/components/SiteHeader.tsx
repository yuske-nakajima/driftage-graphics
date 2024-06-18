import SiteTitle from '@/components/SiteTitle'

const SiteHeader = () => {
  return (
    <>
      <header className={['bg-transparent', 'py-2'].join(' ')}>
        <SiteTitle />
      </header>
    </>
  )
}
export default SiteHeader
