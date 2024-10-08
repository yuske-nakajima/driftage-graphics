import Head from '@/components/atoms/Head'
import TitleSearchBox from '@/components/molecules/TitleSearchBox'
import SiteFooter from '@/components/organisms/SiteFooter'
import SiteHeader from '@/components/organisms/SiteHeader'
import SiteContainer from '@/components/templates/SiteContainer'
import { PAGE_LIST } from '@/lib/pageList'
import { useState } from 'react'

const index = () => {
  const [pageListState, setPageListState] = useState(PAGE_LIST)

  return (
    <>
      <Head title={'DRIFTAGE GRAPHICS'} description={'生成アートの練習'} />
      <SiteContainer>
        <div>
          <SiteHeader />
          <TitleSearchBox setListState={setPageListState} />
        </div>
        <main
          className={['overflow-y-auto', 'max-h-[calc(100vh-20rem)]'].join(' ')}
        >
          <ul>
            {pageListState.map((page) => (
              <li key={page.href}>
                <a
                  className={[
                    'block',
                    'p-2',
                    'border-b',
                    'border-gray-700',
                    'hover:bg-gray-900',
                    'hover:text-gray-500',
                  ].join(' ')}
                  href={`/${page.href}`}
                >
                  {page.title}
                </a>
              </li>
            ))}
          </ul>
        </main>
        <SiteFooter />
      </SiteContainer>
    </>
  )
}
export default index
