import { Box, Flex, Input, Text } from 'theme-ui'
import React, { FC, ReactChild } from 'react'

interface CustomInputProps {
    label: string
    value: string
    placeholder: string
    subLabel?: string
    type?: string
    staticLeft?: ReactChild
    staticRight?: ReactChild
    Icon?: ReactChild
    onChange: (value: string) => void
}

const CustomInput: FC<CustomInputProps> = ({
    label,
    placeholder,
    value,
    subLabel,
    type,
    staticLeft,
    staticRight,
    Icon,
    onChange,
}) => {
    return (
        <Box>
            <Text
                variant="heading"
                sx={{ display: 'block', marginBottom: '7px' }}
            >
                {label}
            </Text>
            <Text
                sx={{
                    fontWeight: 'heading',
                    fontSize: '13px',
                    display: 'block',
                    marginBottom: '7px',
                    color: 'textSecondary',
                }}
            >
                {subLabel}
            </Text>
            <Flex
                sx={{ alignItems: 'center', borderBottom: '2px #eaeaea solid' }}
            >
                {staticLeft && staticLeft}
                <Input
                    type={type}
                    placeholder={placeholder}
                    defaultValue={value}
                    variant="input"
                    onChange={(event) => onChange(event.target.value)}
                />
                {staticRight && staticRight}
                {Icon && Icon}
            </Flex>
        </Box>
    )
}

export default CustomInput
