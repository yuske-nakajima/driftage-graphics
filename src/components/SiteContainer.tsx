import { FC, ReactNode } from 'react'

const SiteContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <div
        style={{
          backgroundColor: '#4a4a55',
        }}
        className={[
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
