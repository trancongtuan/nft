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
    staticBottom?: ReactChild
    Icon?: ReactChild
    optional?: boolean
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
    staticBottom,
    Icon,
    optional,
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
                {optional && (
                    <Text
                        ml={2}
                        sx={{
                            fontSize: 13,
                            color: 'textSecondary',
                            fontWeight: 500,
                            lineHeight: 1.3,
                        }}
                    >
                        (Optional)
                    </Text>
                )}
            </Flex>
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
                    color="text"
                    type={type}
                    placeholder={placeholder}
                    defaultValue={value}
                    variant="input"
                    onChange={(event) => onChange(event.target.value)}
                />
                {staticRight && staticRight}
                {Icon && Icon}
            </Flex>
            {staticBottom && (
                <Box mt={2}>
                    <Text
                        sx={{
                            fontSize: 13,
                            color: 'textSecondary',
                            fontWeight: 500,
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
