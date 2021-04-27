import { Box } from 'theme-ui'
import React, { FC } from 'react'

const EdgeOverflow: FC = () => {
    return (
        <Box
            sx={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                width: 30,
                opacity: 1,
                zIndex: 999,
                background:
                    'linear-gradient(to left, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%)',
            }}
        />
    )
}

export default EdgeOverflow
