import '../styles/globals.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import React, { FC } from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'theme-ui'
import { theme } from '../styles/theme'

const App: FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <ThemeProvider theme={theme}>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}

export default App
