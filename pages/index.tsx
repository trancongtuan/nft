import React, { FC } from 'react'
import { useColorMode } from 'theme-ui'
import Button from '../components/Button'
import Tooltip from '../components/Tooltip'

const items = [
    {
        id: 1,
        label: 'Label 1',
    },
    {
        id: 2,
        label: 'Label 2',
    },
    {
        id: 3,
        label: 'Label 3',
    },
]

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
            <Tooltip items={items} visible />
        </div>
    )
}
export default Home
