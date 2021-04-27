import React, { FC, PropsWithChildren } from 'react'
import { Box } from 'theme-ui'
import NavigationBar from '../components/NavigationBar'
import Footer from '../components/Footer'

const Layout: FC<PropsWithChildren<Record<string, unknown>>> = ({
    children,
}) => {
    return (
        <Box>
            <NavigationBar />
            <Box
                py={32}
                px={[24, 28, 32]}
                mx="auto"
                sx={{
                    width: '100%',
                    maxWidth: 1500,
                }}
            >
                {children}
            </Box>
            <Footer />
        </Box>
    )
}

export default Layout
