import { addDecorator } from '@storybook/react'
import { ThemeProvider } from '@theme-ui/theme-provider'
import { useColorMode } from 'theme-ui'
import theme from '../styles/theme'

const ChangeMode = () => {
    const [colorMode, setColorMode] = useColorMode()
    return (
        <button
            onClick={() => {
                setColorMode(colorMode === 'default' ? 'dark' : 'default')
            }}
        >
            {colorMode === 'default' ? 'Dark' : 'Light'}
        </button>
    )
}

addDecorator((storyFn) => (
    <ThemeProvider theme={theme}>
        <ChangeMode />
        {storyFn()}
    </ThemeProvider>
))
