import { PAGE_LIST } from '@/lib/pageList'
import { PageInfo } from '@/lib/types'
import { ChangeEvent, SetStateAction } from 'react'

type SearchBoxProps = {
  setListState: (value: SetStateAction<PageInfo[]>) => void
}

const index = ({ setListState }: SearchBoxProps) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchWord = e.target.value

    if (searchWord === '') {
      setListState(PAGE_LIST)
      return
    }

    const newList = PAGE_LIST.filter((page) => {
      return page.title.includes(searchWord)
    })
    setListState(newList)
  }

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
        onChange={onChange}
      />
    </div>
  )
}
export default index
