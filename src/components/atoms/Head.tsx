import Head from 'next/head'

type Props = {
  title: string
  description: string
}

const index = ({ title, description }: Props) => {
  return (
    <Head>
      <title>DRIFTAGE GRAPHICS - {title}</title>
      <meta name='description' content={description} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  )
}
export default index
