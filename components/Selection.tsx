import { Box, Flex, Text } from 'theme-ui'
import React, { FC, useState } from 'react'
import NewIcon from '../public/assets/images/icons/new.svg'

export interface SelectionItemsProps {
    id: string | number
    label: string
    count?: number
    isNew?: boolean
    value: string
}

interface SelectionProps {
    items: SelectionItemsProps[]
    fontSize?: string | number
    onChange?: (item: SelectionItemsProps) => void
    borderBottom?: boolean
    selectedItem?: SelectionItemsProps
}

const Selection: FC<SelectionProps> = ({
    items,
    onChange,
    fontSize,
    borderBottom = true,
    selectedItem,
}) => {
    const [selectedTab, setSelectedTab] = useState<
        SelectionItemsProps | undefined
    >(selectedItem ?? items[0])
    return (
        <Box sx={{ overflow: 'auto', whiteSpace: 'nowrap' }}>
            {items.map((item) => (
                <Box
                    key={item.id}
                    sx={{
                        height: 30,
                        position: 'relative',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        marginRight: 3,
                        display: 'inline-block',
                        ':last-child': {
                            marginRight: 0,
                        },
                    }}
                    onClick={() => {
                        setSelectedTab(item)
                        onChange(item)
                    }}
                >
                    <Flex sx={{ alignItems: 'center' }}>
                        <Text
                            sx={{
                                color:
                                    item === selectedTab
                                        ? 'text'
                                        : 'textSecondary',
                                fontWeight: 'bold',
                                fontSize: fontSize || 1,
                                lineHeight: '30px',
                                transition: 'all 0.12s ease-in-out 0s',
                                ':hover': {
                                    color: 'text',
                                },
                            }}
                        >
                            {item.label}
                        </Text>
                        {item.isNew && (
                            <Box ml={8} sx={{ cursor: 'default' }}>
                                <NewIcon />
                            </Box>
                        )}
                        {typeof item.count === 'number' && (
                            <Text
                                sx={{
                                    verticalAlign: 'top',
                                    ml: '4px',
                                    color: 'textSecondary',
                                    fontSize: 0,
                                    fontWeight: 'heavy',
                                    lineHeight: '22px',
                                    mb: '4px',
                                }}
                            >
                                {item.count}
                            </Text>
                        )}
                    </Flex>
                    {borderBottom && (
                        <Box
                            bg="text"
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: 2,
                                width: '100%',
                                visibility:
                                    item === selectedTab ? 'visible' : 'hidden',
                            }}
                        />
                    )}
                </Box>
            ))}
        </Box>
    )
}

export default Selection
