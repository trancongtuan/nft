import { alpha } from '@theme-ui/color'
import React, { FC, PropsWithChildren, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Flex, Text, useColorMode } from 'theme-ui'
import CheckedIcon from '../public/assets/images/icons/checked.svg'

export interface TooltipItemProps {
    id: string | number
    label: string
    value?: string
    icon?: () => ReactNode
}

export interface TooltipProps {
    items?: TooltipItemProps[]
    onClick?: (item: TooltipItemProps) => void
    minWidth?: number
    selectedItem?: TooltipItemProps
}

const Tooltip: FC<PropsWithChildren<TooltipProps>> = ({
    items,
    onClick,
    minWidth,
    children,
    selectedItem,
}) => {
    const { t } = useTranslation('common')
    const [colorMode] = useColorMode()
    return (
        <Flex
            py={3}
            bg="background"
            sx={{
                flexDirection: 'column',
                flexGrow: 1,
                boxShadow: (trans) =>
                    colorMode !== 'dark'
                        ? `${alpha('text', 0.2)(trans)} 0px 7px 36px -8px`
                        : undefined,
                borderRadius: 8,
                border: (trans) =>
                    colorMode === 'dark'
                        ? `1px solid ${alpha('white', 0.1)(trans)}`
                        : undefined,
                transition: 'all 0.12s ease-in-out 0s',
                minWidth: minWidth ?? 207,
            }}
        >
            {items &&
                items.map((item) => (
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
                        <Flex
                            sx={{
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Flex sx={{ alignItems: 'center' }}>
                                {!!item.icon && item.icon()}
                                <Text
                                    sx={{
                                        color: 'text',
                                        fontSize: 1,
                                        lineHeight: '19px',
                                        fontWeight: 'bold',
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        maxWidth: '100%',
                                    }}
                                >
                                    {t(item.label)}
                                </Text>
                            </Flex>
                            {selectedItem === item && (
                                <Box color="primary">
                                    <CheckedIcon />
                                </Box>
                            )}
                        </Flex>
                    </Button>
                ))}
            {children}
        </Flex>
    )
}

export default Tooltip
