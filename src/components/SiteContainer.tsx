import { FC, ReactNode } from 'react'

const SiteContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <div
        className={[
          'bg-gray-800',
          'h-screen',
          'flex',
          'flex-col',
          'justify-between',
          'xl:px-20',
          'sm:px-10',
        ].join(' ')}
      >
        {children}
      </div>
    </>
  )
}
export default SiteContainer
