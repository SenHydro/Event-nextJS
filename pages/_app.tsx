import '../styles/globals.css'
import '../styles/general.sass'
import type { AppProps } from 'next/app'
import Mainlayout from '../src/component/layout/main-layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Mainlayout>
        <Component {...pageProps} />
      </Mainlayout>
    </>
  )
}
