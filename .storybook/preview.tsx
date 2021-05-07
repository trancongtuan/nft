import '../styles/globals.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import React from 'react'
import { Button, Flex, ThemeProvider, useColorMode } from 'theme-ui'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
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
            <I18nextProvider i18n={i18n}>
                <ChangeMode />
                <Flex m={2}>
                    <Story />
                </Flex>
            </I18nextProvider>
        </ThemeProvider>
    ),
]
