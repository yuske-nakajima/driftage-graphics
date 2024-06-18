import { FC, ReactNode } from 'react'

type Props = {
  name: string
  description: string
}

const SiteMainArea: FC<{ children: ReactNode } & Props> = ({
  children,
  name,
  description,
}) => {
  return (
    <div
      className={[
        'bg-gray-200',
        'h-5/6',
        'border-8',
        'border-gray-600',
        'px-6',
      ].join(' ')}
    >
      <div
        className={[
          'bg-transparent',
          'flex',
          'justify-end',
          'items-center',
          'py-2',
          'text-gray-300',
        ].join(' ')}
      >
        yuske
      </div>
      <div
        className={[
          'bg-transparent',
          'border-2',
          'border-gray-300',
          'rounded-3xl',
          'h-5/6',
          'w-full',
          'p-2',
        ].join(' ')}
      >
        <div
          className={[
            'bg-white',
            'border-2',
            'border-gray-600',
            'rounded-3xl',
            'h-full',
            'w-full',
            'flex',
            'justify-center',
            'items-center',
          ].join(' ')}
        >
          {children}
        </div>
      </div>
      <div className={['bg-transparent'].join(' ')}>
        <div
          className={[
            'grid',
            'grid-cols-[auto,1fr]',
            'gap-x-2',
            'py-2',
            'text-gray-400',
          ].join(' ')}
        >
          <div>NAME:</div>
          <div>{name}</div>
          <div>DESCRIPTION:</div>
          <div>{description}</div>
        </div>
      </div>
    </div>
  )
}
export default SiteMainArea
