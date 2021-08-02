import '../styles/globals.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'nprogress/nprogress.css'
import React, { FC } from 'react'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { ThemeProvider } from 'theme-ui'
import { appWithTranslation } from 'next-i18next'
import { QueryClient, QueryClientProvider } from 'react-query'
import { theme } from '../styles/theme'
import { AuthProvider } from '../hooks/auth'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: false,
            staleTime: 86400000,
        },
    },
})

const TopProgressBar = dynamic(() => import('../components/TopProgressBar'), {
    ssr: false,
})

const App: FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <ThemeProvider theme={theme}>
            <TopProgressBar />
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <Component {...pageProps} />
                </AuthProvider>
            </QueryClientProvider>
        </ThemeProvider>
    )
}

export default appWithTranslation(App)
