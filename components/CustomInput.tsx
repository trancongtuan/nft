import { Box, Flex, Input, Text } from 'theme-ui'
import React, { FC, ReactChild } from 'react'

interface CustomInputProps {
    label: string
    optionLabel?: string
    value: string
    placeholder: string
    subLabel?: string
    type?: string
    staticLeft?: ReactChild
    staticRight?: ReactChild
    staticBottom?: ReactChild
    Icon?: ReactChild
    onChange?: (value: string) => void
}

const CustomInput: FC<CustomInputProps> = ({
    label,
    optionLabel,
    placeholder,
    value,
    subLabel,
    type,
    staticLeft,
    staticRight,
    staticBottom,
    Icon,
    onChange,
}) => {
    return (
        <Box>
            <Flex sx={{ marginBottom: '7px' }}>
                <Text
                    variant="heading"
                    sx={{ display: 'block', lineHeight: 1 }}
                >
                    {label}
                </Text>
                {optionLabel && (
                    <Text
                        ml={2}
                        sx={{
                            fontSize: 13,
                            color: 'textSecondary',
                            fontWeight: 'body',
                            lineHeight: 1.3,
                        }}
                    >
                        ({optionLabel})
                    </Text>
                )}
            </Flex>
            <Text
                sx={{
                    fontWeight: 'bold',
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
                {staticLeft}
                <Input
                    color="text"
                    type={type}
                    placeholder={placeholder}
                    variant="input"
                    onChange={(event) => {
                        if (onChange) onChange(event.target.value)
                    }}
                    value={value}
                />
                {staticRight && (
                    <Flex
                        sx={{
                            fontWeight: 'semiBold',
                            color: 'textSecondary',
                            fontSize: 1,
                            minWidth: 'max-content',
                        }}
                    >
                        {staticRight}
                    </Flex>
                )}
                {Icon}
            </Flex>
            {staticBottom && (
                <Box mt={2}>
                    <Text
                        sx={{
                            fontSize: 13,
                            color: 'textSecondary',
                            fontWeight: 'body',
                            lineHeight: 1.3,
                        }}
                    >
                        {staticBottom}
                    </Text>
                </Box>
            )}
        </Box>
    )
}

export default CustomInput
