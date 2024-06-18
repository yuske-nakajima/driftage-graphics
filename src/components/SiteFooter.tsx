const SiteFooter = () => {
  return (
    <>
      <footer
        className={[
          'bg-transparent',
          'py-2',
          'flex',
          'justify-end',
          'text-xs',
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
