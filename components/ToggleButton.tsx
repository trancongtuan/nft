import { Box } from 'theme-ui'
import React, { FC, useEffect, useState } from 'react'
import { alpha } from '@theme-ui/color'

interface ToggleButtonProps {
    onChange?: (value: boolean) => void
}

const ToggleButton: FC<ToggleButtonProps> = ({ onChange }) => {
    const [toggle, setToggle] = useState(false)
    useEffect(() => onChange && onChange(toggle), [toggle, onChange])
    return (
        <Box
            sx={{
                cursor: 'pointer',
                borderRadius: 28,
                padding: 1,
                width: '28px',
                height: '16px',
                background: (t) =>
                    toggle ? alpha('primary', 0.1)(t) : 'rgb(45, 129, 255)',
            }}
            onClick={() => {
                setToggle(!toggle)
            }}
        >
            <Box
                sx={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    transition: 'all 0.12s ease-in-out 0s',
                    background: `${toggle ? 'rgb(45, 129, 255)' : '#FFF'}`,
                    transform: `${
                        toggle ? 'translateX(12px)' : 'translateX(0)'
                    }`,
                }}
            />
        </Box>
    )
}

export default ToggleButton
