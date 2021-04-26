import { alpha } from '@theme-ui/color'
import React, { FC } from 'react'
import { Box, Button, Text, useColorMode } from 'theme-ui'

interface TooltipItemProps {
    id: string | number
    label: string
}

export interface TooltipProps {
    items: TooltipItemProps[]
    onClick?: (item: TooltipItemProps) => void
    visible?: boolean
}

const Tooltip: FC<TooltipProps> = ({ items, onClick, visible }) => {
    const [colorMode] = useColorMode()
    return (
        <Box
            py={16}
            bg="background"
            sx={{
                display: visible ? 'flex' : 'none',
                flexDirection: 'column',
                flexGrow: 1,
                boxShadow: (t) =>
                    colorMode !== 'dark'
                        ? `${alpha('text', 0.2)(t)} 0px 7px 36px -8px`
                        : undefined,
                borderRadius: 8,
                border: (t) =>
                    colorMode === 'dark'
                        ? `1px solid ${alpha('white', 0.1)(t)}`
                        : undefined,
                transition: 'all 0.12s ease-in-out 0s',
                minWidth: 207,
            }}
        >
            {items.map((item) => (
                <Button
                    variant=""
                    bg="background"
                    px="12px"
                    py={2}
                    mx="12px"
                    sx={{
                        transition: 'all 0.12s ease-in-out 0s',
                        textAlign: 'left',
                        minHeight: 32,
                        borderRadius: 6,
                        ':hover': {
                            backgroundColor: 'hover',
                        },
                        cursor: 'pointer',
                        ':focus': {
                            outline: 'none',
                        },
                    }}
                    key={item.id}
                    onClick={() => onClick && onClick(item)}
                >
                    <Text
                        sx={{
                            color: 'text',
                            fontSize: 1,
                            lineHeight: '19px',
                            fontWeight: 'heading',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            maxWidth: '100%',
                        }}
                    >
                        {item.label}
                    </Text>
                </Button>
            ))}
        </Box>
    )
}

export default Tooltip
