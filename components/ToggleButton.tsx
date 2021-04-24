import { Box, Text } from 'theme-ui'
import React, { FC, useState } from 'react'

interface ToggleButtonProps {
    onChange: (value: string | number) => void
}

const ToggleButton: FC<ToggleButtonProps> = ({ onChange }) => {
    const [toggle, setToggle] = useState('off')

    return (
        <Box
            variant={
                toggle === 'on'
                    ? 'toggleButton.button'
                    : 'toggleButton.activeButton'
            }
            onClick={() => {
                onChange(toggle === 'on' ? 'off' : 'on')
                setToggle(toggle === 'on' ? 'off' : 'on')
            }}
        >
            <Box
                variant="toggleButton.circle"
                sx={{
                    background: `${
                        toggle === 'on' ? 'rgb(45, 129, 255)' : '#FFF'
                    }`,
                    transform: `${
                        toggle === 'on' ? 'translateX(12px)' : 'translateX(0)'
                    }`,
                }}
            />
        </Box>
    )
}

export default ToggleButton
