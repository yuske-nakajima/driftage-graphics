import SiteTitle from '@/components/molecules/SiteTitle'
import Link from 'next/link'

const index = () => {
  return (
    <>
      <header className={['bg-transparent', 'py-2'].join(' ')}>
        <Link href='/'>
          <SiteTitle />
        </Link>
      </header>
    </>
  )
}
export default index
