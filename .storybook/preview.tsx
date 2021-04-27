import '../styles/globals.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import React from 'react'
import { Button, Flex, ThemeProvider, useColorMode } from 'theme-ui'
import { theme } from '../styles/theme'

const ChangeMode = () => {
    const [colorMode, setColorMode] = useColorMode()
    return (
        <Button
            onClick={() =>
                setColorMode(colorMode === 'default' ? 'dark' : 'default')
            }
        >
            {colorMode === 'default' ? 'Dark' : 'Light'}
        </Button>
    )
}

export const decorators = [
    (Story: React.FC<{}>) => (
        <ThemeProvider theme={theme}>
            <ChangeMode />
            <Flex m={2}>
                <Story />
            </Flex>
        </ThemeProvider>
    ),
]
