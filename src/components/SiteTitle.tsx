const SiteTitle = () => {
  return (
    <h1
      className={[
        'text-gray-600',
        'text-xl',
        'sm:text-2xl',
        'md:text-4xl',
        'xl:text-6xl',
        'flex',
        'items-center',
      ].join(' ')}
    >
      DRIFTAGE GRAPHICS
      <span
        className={[
          'text-xs',
          'sm:text-xs',
          'md:text-xl',
          'xl:text-4xl',
          'ml-2',
        ].join(' ')}
      >
        - 生成アート練習場 -
      </span>
    </h1>
  )
}
export default SiteTitle
