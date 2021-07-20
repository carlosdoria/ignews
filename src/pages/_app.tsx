// import App from "next/app";
import { Header } from 'components/Header'
import { AppProps /* , AppContext */ } from 'next/app'
import Head from 'next/head'
import { Provider as NextAuthProvider } from 'next-auth/client'

import '../styles/globals.scss'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Head>
        <title>IgNews</title>
        <meta name="description" content="My boilerplete" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </NextAuthProvider>
  )
}

export default MyApp
