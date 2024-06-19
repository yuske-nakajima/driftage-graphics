import { FC, ReactNode } from 'react'

const SiteContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <div
        className={[
          'bg-gray-700',
          'h-screen',
          'flex',
          'flex-col',
          'justify-between',
          'px-2',
          'sm:px-4',
          'md:px-8',
        ].join(' ')}
      >
        {children}
      </div>
    </>
  )
}
export default SiteContainer
