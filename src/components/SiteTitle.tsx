const SiteTitle = () => {
  return (
    <h1
      className={['text-gray-600', 'xl:text-4xl', 'flex', 'items-center'].join(
        ' ',
      )}
    >
      DRIFTAGE GRAPHICS
      <span className={['xl:text-xl', 'ml-2'].join(' ')}>
        - 生成アート練習場 -
      </span>
    </h1>
  )
}
export default SiteTitle
