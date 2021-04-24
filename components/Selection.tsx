import { Box, Text } from 'theme-ui'
import React, { FC, useState } from 'react'

interface SelectionItemsProps {
    id: string | number
    label: string
    count: number
}

interface SelectionProps {
    items: SelectionItemsProps[]
    onChange: (value: string | number) => void
}

const Selection: FC<SelectionProps> = ({ items, onChange }) => {
    const [selectedTab, setSelectedTab] = useState(items[0].id)
    return (
        <Box variant="selection">
            {items.map((item) => (
                <Box
                    key={item.id}
                    variant={
                        item.id === selectedTab
                            ? 'selection.itemActive'
                            : 'selection.item'
                    }
                    onClick={() => {
                        onChange(item.id)
                        setSelectedTab(item.id)
                    }}
                >
                    <Text>{item.label}</Text>
                    <Text variant="selection.count">{item.count}</Text>
                </Box>
            ))}
        </Box>
    )
}

export default Selection
