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
            {children}
            <Footer />
        </Box>
    )
}

export default Layout
