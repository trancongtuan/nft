import React, { FC } from 'react'
import { Button, useColorMode, Text, Box } from 'theme-ui'

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
                boxShadow:
                    colorMode !== 'dark'
                        ? 'rgb(4 4 5 / 20%) 0px 7px 36px -8px'
                        : undefined,
                borderRadius: 8,
                border:
                    colorMode === 'dark'
                        ? '1px solid rgba(255, 255, 255, 0.1)'
                        : undefined,
                transition: 'all 0.12s ease-in-out 0s',
                transform: 'translate(20px, 95px)',
                minWidth: 207,
            }}
        >
            {items.map((item) => (
                <Button
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
