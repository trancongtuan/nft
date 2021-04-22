import '../styles/globals.css'
import React, { FC } from 'react'
import type { AppProps /* , AppContext */ } from 'next/app'

const App: FC<AppProps> = ({ Component, pageProps }) => {
    return <Component {...pageProps} />
}

export default App
