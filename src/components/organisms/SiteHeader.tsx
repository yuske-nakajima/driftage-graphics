import SiteTitle from '@/components/molecules/SiteTitle'

const index = () => {
  return (
    <>
      <header className={['bg-transparent', 'py-2'].join(' ')}>
        <SiteTitle />
      </header>
    </>
  )
}
export default index
