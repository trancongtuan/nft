import { Text, Flex, Button, Box } from 'theme-ui'
import React, { FC, ReactNode } from 'react'
import CheckedIcon from '../public/assets/images/icons/checked.svg'

interface TooltipItemProps {
    id: string
    onClick?: () => void
    label: string
    rightStatic?: () => ReactNode
    disable?: boolean
    selectedItem?: string
}

const TooltipItem: FC<TooltipItemProps> = ({
    id,
    onClick,
    label,
    rightStatic,
    disable,
    selectedItem,
}) => {
    return (
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
                borderRadius: 0,
                ':hover': {
                    backgroundColor: disable ? 'null' : 'hover',
                },
                cursor: 'pointer',
                ':focus': {
                    outline: 'none',
                },
            }}
            onClick={() => onClick && onClick()}
        >
            <Flex sx={{ justifyContent: 'space-between' }}>
                <Text
                    sx={{
                        color: disable ? 'textSecondary' : 'text',
                        cursor: disable ? 'text' : 'pointer',
                        fontSize: 1,
                        lineHeight: '19px',
                        fontWeight: 'bold',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        maxWidth: '100%',
                    }}
                >
                    {label}
                </Text>
                {rightStatic && rightStatic()}
                {selectedItem === id && (
                    <Box color="primary">
                        <CheckedIcon />
                    </Box>
                )}
            </Flex>
        </Button>
    )
}
export default TooltipItem
