import React, { FC } from 'react'
import { useColorMode } from 'theme-ui'
import Button from '../components/Button'

const Home: FC = () => {
    const [colorMode, setColorMode] = useColorMode()
    return (
        <div>
            <Button
                onPress={() => {
                    setColorMode(colorMode === 'default' ? 'dark' : 'default')
                }}
                title={colorMode === 'default' ? 'Dark' : 'Light'}
            />
        </div>
    )
}
export default Home
