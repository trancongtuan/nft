import { Box } from 'theme-ui'
import React, { Dispatch, FC, SetStateAction } from 'react'

interface ToggleButtonProps {
    size?: 'small' | 'large'
    toggle?: boolean
    setToggle?: Dispatch<SetStateAction<boolean>>
}

const ToggleButton: FC<ToggleButtonProps> = ({
    size = 'small',
    toggle = false,
    setToggle,
}) => {
    return (
        <Box
            p={1}
            sx={{
                cursor: 'pointer',
                borderRadius: size === 'small' ? 28 : 40,
                width: size === 'small' ? 28 : 40,
                height: size === 'small' ? 16 : 20,
                backgroundColor: toggle ? 'toggleButtonOn' : 'toggleButtonOff',
            }}
            onClick={() => {
                if (setToggle) {
                    setToggle(!toggle)
                }
            }}
        >
            <Box
                sx={{
                    width: size === 'small' ? 8 : 12,
                    height: size === 'small' ? 8 : 12,
                    borderRadius: '50%',
                    transition: 'all 0.12s ease-in-out 0s',
                    backgroundColor: `${
                        toggle ? 'toggleCircle' : 'rgb(45, 129, 255)'
                    }`,
                    transform: `${
                        toggle
                            ? `translateX(${
                                  size === 'small' ? '12px' : '20px'
                              })`
                            : 'translateX(0)'
                    }`,
                }}
            />
        </Box>
    )
}

export default ToggleButton
