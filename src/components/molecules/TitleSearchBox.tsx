import { PAGE_LIST } from '@/lib/pageList'
import { PageInfo } from '@/lib/types'
import { SetStateAction } from 'react'

type SearchBoxProps = {
  setListState: (value: SetStateAction<PageInfo[]>) => void
}

const index = ({ setListState }: SearchBoxProps) => {
  return (
    <div className={['p-2', 'border-b', 'border-gray-700'].join(' ')}>
      <input
        className={[
          'w-full',
          'p-2',
          'bg-gray-900',
          'text-gray-500',
          'border',
          'border-gray-700',
          'rounded',
          'focus:outline-none',
          'focus:ring',
          'focus:ring-gray-500',
          'focus:border-gray-500',
        ].join(' ')}
        type='text'
        placeholder='検索...'
        onChange={(e) => {
          const searchWord = e.target.value

          if (searchWord === '') {
            setListState(PAGE_LIST)
            return
          }

          const newList = PAGE_LIST.filter((page) => {
            return page.title.includes(searchWord)
          })
          setListState(newList)
        }}
      />
    </div>
  )
}
export default index
