import '../styles/globals.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import React, { FC } from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'theme-ui'
import { appWithTranslation } from 'next-i18next'
import { QueryClient, QueryClientProvider } from 'react-query'
import { theme } from '../styles/theme'
import { AuthProvider } from '../hooks/auth'

const queryClient = new QueryClient()

const App: FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <Component {...pageProps} />
                </AuthProvider>
            </QueryClientProvider>
        </ThemeProvider>
    )
}

export default appWithTranslation(App)
