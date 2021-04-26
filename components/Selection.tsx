import { Box, Text } from 'theme-ui'
import React, { FC, useEffect, useState } from 'react'

interface SelectionItemsProps {
    id: string | number
    label: string
    count: number
}

interface SelectionProps {
    items: SelectionItemsProps[]
    onChange?: (value: string | number) => void
}

const Selection: FC<SelectionProps> = ({ items, onChange }) => {
    const [selectedTab, setSelectedTab] = useState(items[0].id)
    useEffect(() => onChange && onChange(selectedTab), [selectedTab, onChange])
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
                    }}
                    onClick={() => setSelectedTab(item.id)}
                >
                    <Text
                        sx={{
                            color:
                                item.id === selectedTab
                                    ? 'text'
                                    : 'textSecondary',
                            fontWeight: 'heading',
                            fontSize: 1,
                            lineHeight: '30px',
                            transition: 'all 0.12s ease-in-out 0s',
                            ':hover': {
                                color: 'text',
                            },
                        }}
                    >
                        {item.label}
                    </Text>
                    <Text
                        sx={{
                            verticalAlign: 'top',
                            ml: '4px',
                            color: 'textSecondary',
                            fontSize: 0,
                            fontWeight: 900,
                            lineHeight: '22px',
                        }}
                    >
                        {item.count}
                    </Text>
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            backgroundColor: 'text',
                            height: 2,
                            width: '100%',
                            visibility:
                                item.id === selectedTab ? 'visible' : 'hidden',
                        }}
                    />
                </Box>
            ))}
        </Box>
    )
}

export default Selection
