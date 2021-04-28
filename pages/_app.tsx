import '../styles/globals.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import React, { FC } from 'react'
import type { AppProps } from 'next/app'
import { Button, ThemeProvider, useColorMode } from 'theme-ui'
import { theme } from '../styles/theme'

// TODO: delete after testing

const ChangeMode: FC = () => {
    const [colorMode, setColorMode] = useColorMode()
    return (
        <Button
            onClick={() =>
                setColorMode(colorMode === 'default' ? 'dark' : 'default')
            }
            sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 99 }}
        >
            {colorMode === 'default' ? 'Dark' : 'Light'}
        </Button>
    )
}

const App: FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <ThemeProvider theme={theme}>
            <ChangeMode />
            <Component {...pageProps} />
        </ThemeProvider>
    )
}

export default App
