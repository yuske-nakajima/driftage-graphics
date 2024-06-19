const SiteFooter = () => {
  return (
    <>
      <footer
        style={{ fontSize: '0.5rem' }}
        className={[
          'bg-transparent',
          'py-2',
          'flex',
          'justify-end',
          'text-gray-600',
        ].join(' ')}
      >
        このサイトはgenerative art を発表するサイトです👍
        <br />
        このWEBサイトを見てくれてありがとう💗
      </footer>
    </>
  )
}
export default SiteFooter
