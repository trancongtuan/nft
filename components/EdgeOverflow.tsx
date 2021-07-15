import { Box, useColorMode } from 'theme-ui'
import React, { FC } from 'react'

const EdgeOverflow: FC = () => {
    const [colorMode] = useColorMode()
    return (
        <Box
            sx={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: -1,
                width: 30,
                opacity: 1,
                zIndex: 1,
                background:
                    colorMode !== 'dark' ?
                     'linear-gradient(to left, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%)'
                     : `linear-gradient(to left, rgb(18, 18, 18) 0%, rgba(18, 18, 18, 0) 100%)`,
            }}
        />
    )
}

export default EdgeOverflow
