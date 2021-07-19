// import App from "next/app";
import { Header } from 'components/Header'
import { AppProps /* , AppContext */ } from 'next/app'
import Head from 'next/head'

import '../styles/globals.scss'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Boilerplate</title>
        <meta name="description" content="My boilerplete" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
